const express = require('express')
const router = express.Router()
const { requireSignin, authMiddleware } = require('../controllers/auth');
const {create} = require('../controllers/blog')

router.post('/blog', requireSignin, authMiddleware, create)

module.exports = router;