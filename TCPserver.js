var net = require('net');

var HOST = '0.0.0.0';
var PORT = 8498;
//var login_reply = new Buffer([0x24,0x4C]);
var login_reply = new Buffer('244C110D3879021E053ACABFFFFFFFFFFFFEE','hex');

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {
    
    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        
        console.log('DATA received from ' + sock.remoteAddress + ': ' + data.toString('hex'));
        // Write the data back to the socket, the client will receive it as data from the server
        if (data.indexOf("$L") !== -1){
            console.log("found $L ");
            sock.write(login_reply);
        }
        
    });
    
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
    
}).listen(PORT, HOST);
console.log('Server listening on ' + HOST +':'+ PORT);
