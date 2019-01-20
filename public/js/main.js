let urlInput = document.getElementById("url-input");
               
           let shortUrl = document.getElementById('short-url');
            
       
             document.getElementById("url-form").addEventListener('submit', (e) => {
                e.preventDefault();
                let APIUrl = window.location.href + "new";
                let url = urlInput.value;
                let data = {'url': url};

                console.log(APIUrl)
             fetch(APIUrl, {
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
                        } else {
                          shortUrl.innerText = data.newUrl;
                        }
                });
                  } else {
                  throw Error( `Request rejected with status ${response.status}` );		
                }
            }).catch(error => console.log(error));

      });

