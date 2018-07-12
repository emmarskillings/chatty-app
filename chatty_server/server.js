const express = require('express');
const SocketServer = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');
  const clients = {
    type: 'incomingClients',
    content: wss.clients.size
  };
  wss.broadcast(JSON.stringify(clients));

  ws.onmessage = function(event) {
    const data = JSON.parse(event.data);
    switch(data.type) {
      case 'postMessage':
        data.type = 'incomingMessage'
        wss.broadcast(JSON.stringify(data));
        console.log(`User ${data.username} said ${JSON.parse(event.data).content}`);
        break;
      case 'postNotification':
        data.type = 'incomingNotification';
        wss.broadcast(JSON.stringify(data));
        break;
    }
  }
  ws.on('close', () => {
    console.log('Client disconnected')
    const clients = {
      type: 'incomingClients',
      content: wss.clients.size
    };
    wss.broadcast(JSON.stringify(clients));
  });
})
