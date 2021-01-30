const express = require('express')
const router = express.Router()
const { requireSignin, authMiddleware } = require('../controllers/auth');
const {create, list, listAllBlogCategoriesTags, read, remove, update, photo} = require('../controllers/blog')

router.post('/blog', requireSignin, authMiddleware, create)
router.get('/blogs', list)
router.post('/blogs-categories-tags', listAllBlogCategoriesTags)
router.get('/blog/:slug', read)
router.delete('/blog/:slug', requireSignin, authMiddleware, remove)
router.put('/blog/:slug', requireSignin, authMiddleware, update)
router.get('/blog/photo/:slug', photo)

module.exports = router;