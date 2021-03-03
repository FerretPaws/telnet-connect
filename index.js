var TelnetSocket, net, socket, tSocket;

net = require("net");

const fs = require('fs');

//Place your desired IP adress/domain here
const ip = ''
//Place your desired port number here
const port = ''
//Then just run the program and you should be connected!

({TelnetSocket} = require("telnet-stream"));

socket = net.createConnection(port, ip);

tSocket = new TelnetSocket(socket);

tSocket.on("close", function() {
  return process.exit();
});

tSocket.on("data", function(buffer) {
  return process.stdout.write(buffer.toString("utf8"));
});

tSocket.on("do", function(option) {
  return tSocket.writeWont(option);
});

tSocket.on("will", function(option) {
  return tSocket.writeDont(option);
});

process.stdin.on("data", function(buffer) {
  return tSocket.write(buffer.toString("utf8"));
});
