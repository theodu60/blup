var querystring = require('querystring');
var http = require('http'); //the variable doesn't necessarily have to be named http

var data = querystring.stringify({
      lastname: "lol"
    });

var options = {
    host: 'https://www.repair-heroes.fr',
    port: 80,
    path: '/orders/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
    }
};

var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log("body: " + chunk);
    });
});

req.write(data);
req.end();
