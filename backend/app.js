const express = require("express");
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
const fs = require('fs');
const getRoutes = require('./getRoutes');
const cors = require("cors");
const path = require('path');
const metadata = require('./metadata');
const prerender = require('prerender-node');
const app = express();

// const adminRoutes = require('./routes/admin');

app.use(express.json());
app.use(cors());
// app.use('/api/admin', adminRoutes);


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
// app.use(express.static(path.join(__dirname, '../frontend/build')));

// app.get('/favicon.ico', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
// });

// // Catch-all handler for any requests that don't match above
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
// });

// Function to generate sitemap
const generateSitemap = () => {
  const routes = getRoutes(app);
  const links = routes.map(route => ({ url: route, changefreq: 'weekly', priority: 0.8 }));
  const stream = new SitemapStream({ hostname: 'https://stepupsipcalculator.co.in' });
  const readable = Readable.from(links);

  return streamToPromise(readable.pipe(stream)).then(data => {
    fs.writeFileSync('./public/sitemap.xml', data.toString());
  }).catch(err => {
    console.error(err);
  });
};


// Serve the sitemap file
app.get('/sitemap.xml', (req, res) => {
  res.sendFile(__dirname + '/public/sitemap.xml');
});

app.get('/robots.txt', (req, res) => {
  res.sendFile(__dirname + '/public/robots.txt');
});

app.listen(port, function () {
  generateSitemap()
  console.log(`Server is listening on port ${port}`);
});
