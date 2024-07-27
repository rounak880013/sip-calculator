const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');
const { Readable } = require('stream');

// Define your static routes
const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/sip-calculator', changefreq: 'daily', priority: 0.8 },
  { url: '/simple-sip-calculator', changefreq: 'daily', priority: 0.8 },
  { url: '/stepup-sip-calculator', changefreq: 'daily', priority: 0.8 },
  { url: '/step-up-sip-calculator', changefreq: 'daily', priority: 0.8 },
  { url: '/incremental-sip-calculator', changefreq: 'daily', priority: 0.8 },
  { url: '/mutual-fund/sip-calculator', changefreq: 'daily', priority: 0.8 },
  { url: '/mutual-fund/sip', changefreq: 'daily', priority: 0.8 },
  { url: '/mutual-fund/simple-sip-calculator', changefreq: 'daily', priority: 0.8 },
  { url: '/mutual-fund/stepup-sip-calculator', changefreq: 'daily', priority: 0.8 },
  { url: '/mutual-fund/step-up-sip-calculator', changefreq: 'daily', priority: 0.8 },
  { url: '/mutual-fund/incremental-sip-calculator', changefreq: 'daily', priority: 0.8 },
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
