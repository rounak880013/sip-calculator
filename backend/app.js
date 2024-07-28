const express = require("express");
const cors = require("cors");
const path = require('path');
const metadata = require('./metadata');
const app = express();

const adminRoutes = require('./routes/admin');

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/admin', adminRoutes);

const port = process.env.PORT || 3000;

// Set up EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '../frontend/build')));

console.log(metadata);
// Define routes for each page
Object.keys(metadata).forEach(route => {
  app.get(route, (req, res) => {
    console.log(`Serving metadata for route: ${route}`);
    console.log(metadata[route]);
    // Serve metadata for the current route using EJS
    res.render('index', metadata[route]);
  });
});

// Serve React app for all other routes (client-side routing)
app.get('*', (req, res) => {
  console.log('star');
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Start the server
app.listen(port, function () {
  console.log(`Server is listening on port ${port}`);
});
