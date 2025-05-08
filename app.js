const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3018;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const colors = ['blue', 'red', 'green'];
const sizes = [20, 30, 40];
// Index
app.get('/', (req, res) => {
    res.render('index', {
        css: ['index.css'],
        js: ['index.js']
    });
    // let html = fs.readFileSync(__dirname + '/app/html/index.html', 'utf8');
    // res.send(html);
});

// Color Indexes
app.get('/:color', (req, res, next) => {
    const { color } = req.params;
    if (!colors.includes(color)) return next();
    res.render('color', {
        color,
        css: [`${color}.css`],
        js: []
    });
});

/** 
app.get('/blue', (req, res) => {
    let html = fs.readFileSync(__dirname + '/app/html/blue.html', 'utf8');
    res.send(html);
});
app.get('/red', (req, res) => {
    let html = fs.readFileSync(__dirname + '/app/html/red.html', 'utf8');
    res.send(html);
});
app.get('/green', (req, res) => {
    let html = fs.readFileSync(__dirname + '/app/html/green.html', 'utf8');
    res.send(html);
});
*/

// Color Pages with Sizes
app.get('./:color/:size', (req, res, next) => {
    const { color, size } = req.params;
    const sizeNum = parseInt(size, 10);
    if (!colors.includes(color) || !sizes.includes(sizeNum)) return next();
    res.render('color-size', {
        color,
        size: sizeNum,
        css: [`${color}.css`, `font${size}.css`],
        js: [`${color}.js`]
    });
});
/** 
app.get('/blue/20', (req, res) => {
    let html = fs.readFileSync(__dirname + '/app/html/blue20.html', 'utf8');
    res.send(html);
});
app.get('/blue/30', (req, res) => {
    let html = fs.readFileSync(__dirname + '/app/html/blue30.html', 'utf8');
    res.send(html);
});
app.get('/blue/40', (req, res) => {
    let html = fs.readFileSync(__dirname + '/app/html/blue40.html', 'utf8');
    res.send(html);
});
app.get('/red/20', (req, res) => {
    let html = fs.readFileSync(__dirname + '/app/html/red20.html', 'utf8');
    res.send(html);
});
app.get('/red/30', (req, res) => {
    let html = fs.readFileSync(__dirname + '/app/html/red30.html', 'utf8');
    res.send(html);
});
app.get('/red/40', (req, res) => {
    let html = fs.readFileSync(__dirname + '/app/html/red40.html', 'utf8');
    res.send(html);
});
app.get('/green/20', (req, res) => {
    let html = fs.readFileSync(__dirname + '/app/html/green20.html', 'utf8');
    res.send(html);
});
app.get('/green/30', (req, res) => {
    let html = fs.readFileSync(__dirname + '/app/html/green30.html', 'utf8');
    res.send(html);
});
app.get('/green/40', (req, res) => {
    let html = fs.readFileSync(__dirname + '/app/html/green40.html', 'utf8');
    res.send(html);
});
*/

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});