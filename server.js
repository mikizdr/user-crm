var http = require('http');
var fs = require('fs');

// create our server using the http module
http.createServer(function(req,res) {
	// write to our server. set configuration for the response
	res.writeHead(200, {
		'Content-Type': 'text/html',
		'Access-Control-Allow-Origin' : '*'
	});

	// grab indec.html file using fs
	var readStream = fs.createReadStream(__dirname + '/index.html');

	// send the index.html file to the server
	readStream.pipe(res);
}).listen(1337, function() {
	console.log('Go to http://localhost:13337');
});