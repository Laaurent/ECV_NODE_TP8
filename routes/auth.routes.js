const express = require('express');
const router = express.Router();

const { login } = require('../handlers/auth.handler.js');

router.post('/login', login);

module.exports = router;
