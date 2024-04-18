const express = require('express');
const router = express.Router();

const {handleQRGenerator} = require(`../controller/productController`);

router.get(`/generate/*`, handleQRGenerator);

module.exports = router;