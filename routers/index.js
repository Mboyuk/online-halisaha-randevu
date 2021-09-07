const express = require('express');
const home = require('./home');
const auth = require('./auth');
const halisaha = require("./halisaha")

const router = express.Router();

router.use('/home', home);
router.use('/auth', auth);
router.use("/halisaha", halisaha)

module.exports = router;
