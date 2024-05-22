const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth/auth'));
router.use('/dashboard/settings', require('./dashboard/settings'));
router.use('/dashboard/password', require('./dashboard/password'));

module.exports = router;

