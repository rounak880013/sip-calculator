const express = require("express");
const cors = require("cors");
const path = require('path');
const metadata = require('./metadata');
const prerender = require('prerender-node');
const app = express();

const adminRoutes = require('./routes/admin');

app.use(express.json());
app.use(cors());
app.use('/api/admin', adminRoutes);


let port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Define a route for each page
Object.keys(metadata).forEach(route => {
  app.get(route, (req, res) => {
    console.log(`Serving metadata for route: ${route}`);
    res.render('index', metadata[route]);
  });
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
});

// Catch-all handler for any requests that don't match above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(port, function () {
  console.log(`Server is listening on port ${port}`);
});
