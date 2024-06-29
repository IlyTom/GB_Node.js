const http = require('http');

let pageViewsCounter = { '/': 0, '/about': 0 };

const server = http.createServer((req, res) => {
    if (req.url === '/'){
        pageViewsCounter['/']++;

        res.writeHead(200, {'Content-type':'text/html; charset=utf-8'});
        res.end(`<h1>Корневая страница</h1><p>Просмотров ${pageViewsCounter['/']}</p><a href="/about">Ссылка на страницу /аbout</a>`);
    }
    else if (req.url === '/about'){
        pageViewsCounter['/about']++;

        res.writeHead(200, {'Content-type':'text/html; charset=utf-8'});
        res.end(`<h1>Страница about</h1><p>Просмотров ${pageViewsCounter['/about']}</p><a href="./">Ссылка на страницу /</a>`);
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        res.end('<h1>404 Not Found</h1>');
    }
});

const port = 3000;

server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`)
});
