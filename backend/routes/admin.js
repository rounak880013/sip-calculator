const path = require('path');

const express = require('express');


const router = express.Router();

let i=1;
// /admin/add-product => GET
router.post('/counter', (req, res, next) => {

  console.log(i);
  i++;
  res.status(200).json({ json_data: "chal_raha_han" });
});

// /admin/add-product => POST
// router.post('/add-product', (req, res, next) => {
// });

module.exports = router;
