const express = require('express');
const router = express.Router()
const { create } = require('../controllers/category');

//VALIDATORS
const { runValidation } = require('../validators');
const { categoryCreateValidator } = require('../validators/category');
const { requireSignin, adminMiddleware, authMiddleware } = require('../controllers/auth');

router.post('/category', categoryCreateValidator, runValidation, requireSignin, authMiddleware, create);

module.exports = router;