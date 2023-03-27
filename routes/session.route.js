const express = require('express');
const sessionController = require('../controller/session.controller');
const router = express.Router();


router.post('/session', sessionController.createSession);

router.get('/session', sessionController.getAllSessions);

module.exports = router;
