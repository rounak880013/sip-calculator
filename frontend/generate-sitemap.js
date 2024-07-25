const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');
const { Readable } = require('stream');

// Define your static routes
const links = [
  { url: '/', priority: 1.0 },
  { url: '/sip-calculator', priority: 0.8 },
  { url: '/simple-sip-calculator', priority: 0.8 },
  { url: '/stepup-sip-calculator', priority: 0.8 },
  { url: '/incremental-sip-calculator', priority: 0.8 },
  { url: '/mutual-fund/sip-calculator', priority: 0.8 },
  { url: '/mutual-fund/simple-sip-calculator', priority: 0.8 },
  { url: '/simple-mutual-fund/simple-sip-calculator', priority: 0.8 },
  { url: '/mutual-fund/stepup-sip-calculator', priority: 0.8 },
  { url: '/mutual-fund/incremental-sip-calculator', priority: 0.8 },
  // Add other routes here
];

// Create a sitemap stream
const sitemapStream = new SitemapStream({ hostname: 'https://stepupsipcalculator.co.in/' });

// Path to save the sitemap
const sitemapPath = path.resolve(__dirname, 'public', 'sitemap.xml');

// Create a writable stream to save the sitemap to a file
const writeStream = createWriteStream(sitemapPath);

// Pipe the readable stream of links to the sitemap stream, then to the writable stream
Readable.from(links)
  .pipe(sitemapStream)
  .pipe(writeStream)
  .on('finish', () => {
    console.log(`Sitemap generated and saved to ${sitemapPath}`);
  })
  .on('error', (err) => {
    console.error(`Error generating sitemap: ${err}`);
  });
