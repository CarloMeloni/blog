const express = require('express')
const router = express.Router()
const { requireSignin, adminMiddleware, authMiddleware } = require('../controllers/auth');
const {create,
     list,
     listAllBlogCategoriesTags,
     read,
     remove,
     update,
     photo,
     listRelated,
     listSearch
    } = require('../controllers/blog')

router.post('/blog', requireSignin, authMiddleware, create)
router.get('/blogs', list)
router.post('/blogs-categories-tags', listAllBlogCategoriesTags)
router.get('/blog/:slug', read)
router.delete('/blog/:slug', requireSignin, authMiddleware, remove)
router.put('/blog/:slug', requireSignin, authMiddleware, update)
router.get('/blog/photo/:slug', photo)
router.post('/blogs/related', listRelated)
router.get('/blogs/search', listSearch)

module.exports = router;