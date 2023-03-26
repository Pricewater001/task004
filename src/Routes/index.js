/* eslint-disable*/
const express = require('express');

const router = express.Router();

const data = require("./data")

router.use('/data',data );

module.exports = router;
