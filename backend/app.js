const express = require("express");
const cors = require("cors");
const app = express();

const adminRoutes = require('./routes/admin');

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,FETCH",
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use('/api/admin',adminRoutes);

let port = process.env.PORT || 8000;
app.listen(port, function () {
  console.log(`server is listening on port ${port}`);
});
