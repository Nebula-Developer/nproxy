const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send('Hello World!');
});
const http = require('http');
const server = http.createServer(app);
server.listen(8080);