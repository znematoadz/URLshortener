const dbModels = require('../models/dbModels.js');
const dns = require('dns');


exports.newUrl = (req, res) => {
  
  let url = req.body.url;
  let urlModel = new dbModels({ originalUrl: url})
 
  let newEntry = { originalUrl: url };
  
  //remove protocol for dns lookup
  let hostReg = /^([a-z0-9\-_]+\.)+[a-z0-9\-_]+/i;
  
  //regex to validate protocol format
  let protocolReg = /^https?:\/\/(.*)/i; 
  
  if (url.match(/\/$/i)) {
    url = url.slice(0, -1);
  }
  
  
  
  let protocolMatch = url.match(protocolReg);
  if(!protocolMatch)  {
    return res.json({ error: "Invalid URL" }) 
  }
  let host = protocolMatch[1];
  
  let hostMatch = host.match(hostReg);
  console.log(hostMatch)
  if(hostMatch) {
  dns.lookup(hostMatch[0], (err) => { 
    if(err) {res.json({error: "URL cannot be found"})
            } else {
              dbModels.findOne(newEntry, "shortUrl originalUrl newUrl -_id",(req, resp) => { 
                resp !== null ? res.json(resp) : 
                dbModels.create(newEntry, (err, data) => { err ? 
                    console.log("error ", err) :
                  dbModels.findOneAndUpdate(newEntry, {$set: {newUrl: "https://url-shortener-gj.glitch.me/api/shorturl/" + data['shortUrl']}}, {new: true}, (req, resp) => { 
                  dbModels.findOne(newEntry, "shortUrl originalUrl newUrl -_id",(req, resp) => { 
                  res.json(resp)})
               });
         });
    }); 
  }
  })
}
}


exports.shortUrl = (req, res) => {
  dbModels.findOne(req.params, (err, data) => {
    err ? 
      console.log(err) : 
  data !== null ? res.redirect(data.originalUrl) : 
  res.json({ error: "invalid entry - short Url not found"})
  });
} 