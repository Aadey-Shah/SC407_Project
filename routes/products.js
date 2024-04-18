const express = require("express");
const router = express.Router();

const {
  handleQRGenerator,
  getDetails,
} = require(`../controller/productController`);

router.get(`/generate/*`, handleQRGenerator);
router.get(`/display/*`, getDetails);

module.exports = router;
