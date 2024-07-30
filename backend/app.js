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

app.get('/', (req, res) => {
  res.render('home');
});

const posts = [
  {
      title: 'Home',
      link: 'https://stepupsipcalculator.co.in/',
      description: 'Welcome to StepUp SIP Calculator - Your go-to site for SIP and mutual fund information.',
      author: 'info@stepupsipcalculator.co.in (StepUp SIP Calculator)',
      pubDate: new Date().toUTCString(),
      guid: 'https://stepupsipcalculator.co.in/',
      changefreq: 'weekly',
      priority: 0.8
  },
  {
      title: 'SIP Calculator',
      link: 'https://stepupsipcalculator.co.in/sip-calculator',
      description: 'Calculate your SIP returns with our easy-to-use SIP calculator.',
      author: 'info@stepupsipcalculator.co.in (StepUp SIP Calculator)',
      pubDate: new Date().toUTCString(),
      guid: 'https://stepupsipcalculator.co.in/sip-calculator',
      changefreq: 'weekly',
      priority: 0.8
  },
  {
      title: 'Simple SIP Calculator',
      link: 'https://stepupsipcalculator.co.in/simple-sip-calculator',
      description: 'A simple tool to calculate your SIP returns.',
      author: 'info@stepupsipcalculator.co.in (StepUp SIP Calculator)',
      pubDate: new Date().toUTCString(),
      guid: 'https://stepupsipcalculator.co.in/simple-sip-calculator',
      changefreq: 'weekly',
      priority: 0.8
  },
  {
      title: 'StepUp SIP Calculator',
      link: 'https://stepupsipcalculator.co.in/stepup-sip-calculator',
      description: 'Calculate your StepUp SIP returns with our advanced calculator.',
      author: 'info@stepupsipcalculator.co.in (StepUp SIP Calculator)',
      pubDate: new Date().toUTCString(),
      guid: 'https://stepupsipcalculator.co.in/stepup-sip-calculator',
      changefreq: 'weekly',
      priority: 0.8
  }
];

app.get('/rss.xml', (req, res) => {
  res.set('Content-Type', 'application/rss+xml');
  let rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>StepUp SIP Calculator</title>
  <link>https://stepupsipcalculator.co.in</link>
  <description>Your go-to site for SIP and mutual fund information.</description>
  <language>en-us</language>
  <pubDate>${new Date().toUTCString()}</pubDate>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <docs>http://blogs.law.harvard.edu/tech/rss</docs>
  <generator>StepUp SIP Calculator Generator</generator>
  <managingEditor>info@stepupsipcalculator.co.in (StepUp SIP Calculator)</managingEditor>
  <webMaster>webmaster@stepupsipcalculator.co.in (Webmaster Name)</webMaster>`;

  posts.forEach(post => {
      rssFeed += `
  <item>
    <title>${post.title}</title>
    <link>${post.link}</link>
    <description>${post.description}</description>
    <author>${post.author}</author>
    <pubDate>${post.pubDate}</pubDate>
    <guid>${post.guid}</guid>
  </item>`;
  });

  rssFeed += `
</channel>
</rss>`;

  res.send(rssFeed);
});

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
  // generateSitemap()
  console.log(`Server is listening on port ${port}`);
});
