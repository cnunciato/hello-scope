const http = require('http');
const fs = require('fs');
const pluginID = 'hello-scope';
const path = `/var/run/scope/plugins/${pluginID}/${pluginID}.sock`;

let plugins = {
  Plugins: [
    {
        'id': pluginID,
        'label': 'Volume Counts',
        'description': 'Shows how many volumes each container has mounted',
        'interfaces': ['reporter'],
        'api_version': '1',
    }
  ]
};

const socket = http.createServer((req, res) => {
  const body = JSON.stringify(plugins);
  console.log(new Date().toString());

  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Content-Length': body.length
  });

  res.write(body);
});

socket.listen(path, '0,0,0,0');

process.on('SIGINT', cleanup);

function cleanup() {
  fs.unlinkSync(path);
  process.exit(0);
};
