/*
 * Nebula Proxy - NebulaDeveloper 2023
 * 
 * This is the main file for handling every webserver from 'servers.json'
 * MIT License
 */

const http = require('http');
const http_proxy = require('http-proxy');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const PORT = process.env.PORT || 80;

const proxyPath = path.join(__dirname, 'proxies.json');

function getProxyList() {
    let proxyList = { };
    try {
        proxyList = JSON.parse(fs.readFileSync(proxyPath));
    } catch {
        fs.writeFileSync(proxyPath, parse({}));
    }
    return proxyList;
}

function parse(json) { return JSON.parse(json, null, 4); }


const proxy = http_proxy.createProxyServer({ });

http.createServer((req, res) => {
    let host = req.headers.host;
    var proxyList = getProxyList();
    if (host in proxyList) {
        proxy.web(req, res, { target: proxyList[host] });
    } else {
        res.writeHead(404);
        res.end('404 Not Found');
    }
}).listen(PORT, () => {
    console.log(`Proxy started on port ${PORT}`);
});
