const dbModels = require('../models/dbModels.js');
const dns = require('dns');

// adding new url to db
exports.newUrl = (req, res) => {
  
  let url = req.body.url;
  let urlModel = new dbModels({ originalUrl: url})
 
  let newEntry = { originalUrl: url };
  
  //regex to check for dns lookup
  let hostReg = /^([a-z0-9\-_]+\.)+[a-z0-9\-_]+/i;
  
  //regex used to validate protocol format
  let protocolReg = /^https?:\/\/(.*)/i; 
  
  //if url ends in a '/' this removes it to avoid duplicate urls in db
  if (url.match(/\/$/i)) {
    url = url.slice(0, -1);
  }
  
  
  // validate protocol
  let protocolMatch = url.match(protocolReg);
  if(!protocolMatch)  {
    return res.json({ error: "Invalid URL - try adding http(s)://" }) 
  }
  let host = protocolMatch[1];
  
  let hostMatch = host.match(hostReg);
  
  // dns lookup to validate url, if good checks db for match, if no match adds new url to db
  if(hostMatch) {
  dns.lookup(hostMatch[0], (err) => { 
    if(err) {res.json({error: "URL cannot be found"})
            } else {
              dbModels.findOne(newEntry, "shortUrl originalUrl newUrl -_id",(req, resp) => { 
                resp !== null ? res.json(resp) : 
                dbModels.create(newEntry, (err, data) => { err ? 
                    console.log("error ", err) :
                  dbModels.findOneAndUpdate(newEntry, {$set: {newUrl: 'https://smush.glitch.me/' + data['shortUrl']}}, {new: true}, (req, resp) => { 
                  dbModels.findOne(newEntry, "shortUrl originalUrl newUrl -_id",(req, resp) => { 
                  res.json(resp)})
               });
         });
    }); 
  }
  })
}
}

// given shorlurl this redirects to original url from db
exports.shortUrl = (req, res) => {
  dbModels.findOne(req.params, (err, data) => {
    err ? 
      console.log(err) : 
  data !== null ? res.redirect(data.originalUrl) : 
  res.json({ error: "invalid entry - short Url not found"})
  });
} 