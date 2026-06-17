const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const filePath = path.join(__dirname, 'index.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Server Error');
            return;
        }

        const jsonData = JSON.parse(data);

        if (req.url === '/' || req.url === '/info' || req.url === '/sonolus/info') {
            const infoResponse = {
                buttons: [],
                configuration: { options: [] },
                description: jsonData.description || "",
                title: jsonData.title || "",
                banner: null
            };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(infoResponse));
            return;
        }

        const routes = ['/levels', '/skins', '/backgrounds', '/effects', '/particles', '/engines'];
        const matchedRoute = routes.find(r => req.url.startsWith(r) || req.url.startsWith('/sonolus' + r));

        if (matchedRoute) {
            const key = matchedRoute.replace('/', '');
            const listResponse = jsonData[key] || { pageCount: 1, items: [] };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(listResponse));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ title: jsonData.title, description: jsonData.description, buttons: [] }));
    });
});

// Đoạn này đã sửa để Render tự cấp cổng tự động nè m
const port = process.env.PORT || 3000;
server.listen(port, '0.0.0.0', () => {
    console.log(`Done, wait 1-2s and "sleep.-." is available >_<. ${port}...`);
});
