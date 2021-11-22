const express = require('express');
const proxy = require('http-proxy-middleware');

const server = express();

server.use(express.static('build'));

server.get('/service-worker.js', (req, res) => {
  const data = path.join(process.cwd(), 'build', 'service-worker.js');
  res.sendFile(data);
});
server.use(
  '/api',
  proxy({ target: 'https://api.soapphoto.com', changeOrigin: true }),
);
server.use(
  '/oauth',
  proxy({ target: 'https://api.soapphoto.com', changeOrigin: true }),
);
server.use(
  '/graphql',
  proxy({ target: 'https://api.soapphoto.com', changeOrigin: true }),
);
server.use(
  '/socket.io',
  proxy({ target: 'https://api.soapphoto.com', changeOrigin: true }),
);

server.get('*', (req, res) => {
  res.sendfile(`build/index.html`)
});

server.listen(3002, () => {
  console.log(`> Ready on http://localhost:${3002}`);
});
