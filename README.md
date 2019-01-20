# URL Shortener Microservice


1. POST a URL to [project_url]/new and receive a shortened URL in the JSON response.
Example : {"shortUrl":32,"originalUrl":"https://example.com/","newUrl":"https://smush.glitch.me/1"}

2. If an invalid URL that doesn't follow the http(s): //www.example.com(/more/routes) format, the JSON response will return an error like {"error":"invalid URL"}

3. When visited the shortened URL, will redirect to the original link.


#### Creation Example:

POST https://smush.glitch.me/new - body (urlencoded) :  url=https://www.google.com

#### Usage:

https://smush.glitch.me/43

#### Will redirect to:

http://www.freecodecamp.com