var net = require('net');

var HOST = '0.0.0.0';
var PORT = 8498;
//var login_reply = new Buffer([0x24,0x4C,0xFF]);
var login_reply = new Buffer("404C500D388000021E053AC0AAAAFFFF011E",'hex');
//var login_reply = new Buffer("404C107919443636333964003D0001010223000403840F0006057F00000000030002010807247401110501750111040476011102020103020A0103FE6C00C00101FE6300C0FE06003C60",'hex');

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {
    
    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        
        // Write the data back to the socket, the client will receive it as data from the server
        if (data.indexOf("$L") !== -1){
   	        console.log('$L received from ' + sock.remoteAddress + ': ' + data.toString('hex'));
   	        // Send Login reply @L
            sock.write(login_reply);
        }
        else if (data.indexOf("$R") !== -1){
   	        console.log('$R received from ' + sock.remoteAddress + ': ' + data.toString('hex'));

        }
        else{
        	console.log('DATA received from ' + sock.remoteAddress + ': ' + data);
        }
        
    });
    
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
    
}).listen(PORT, HOST);
console.log('Server listening on ' + HOST +':'+ PORT);
