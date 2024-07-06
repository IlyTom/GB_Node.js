const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

const views = {
    '/index.html':0,
    '/about.html':0
}

app.use((req,res,next)=>{    
    views[`${req.url}`]++;
    fs.writeFileSync('views.json', JSON.stringify(views));    
    next();
});

app.use(express.static('static'));


app.get('/pageViews',(req,res)=>{
    const page = req.query.page;
    const data = views[`${page}`];
    res.json({"count": data})
})

if (fs.existsSync('views.json')) {
    const data = fs.readFileSync('views.json', 'utf8');
    Object.assign(views, JSON.parse(data));
}



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});