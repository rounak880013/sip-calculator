const express = require("express");
const cors = require("cors");
const path = require('path');
const app = express();

const adminRoutes = require('./routes/admin');

app.use(express.json());

app.use(cors());

app.use('/api/admin',adminRoutes);

let port = process.env.PORT || 3000;

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(port, function () {
  console.log(`server is listening on port ${port}`);
});
