let urlInput = document.getElementById("url-input");
let shortUrl = document.getElementById('short-url');
            
function formHandler(e) {
      e.preventDefault();
      let url = window.location.href + "new";
      let urlVal = urlInput.value;
      let data = {'url': urlVal};

                
             fetch(url, {
                          method: 'POST',
                          body: JSON.stringify(data),
                          headers: {
                            'Content-Type': 'application/json'
                          }
	              })
               .then( (response) => {
                   if (response.ok) {

                      response.json().then((data) => {
                        if (data.error) {
                          console.log(data.error)
                          shortUrl.innerText = data.error;
                        } else {
                          shortUrl.innerText = data.newUrl;
                        }
                });
                  } else {
                  throw Error( `Request rejected with status ${response.status}` );		
                }
            }).catch(error => console.log(error));

      }

document.getElementById("url-form").addEventListener('submit', formHandler);

