const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('OK');
}).listen(8080, '0.0.0.0');

console.log('Server started on 8080');
