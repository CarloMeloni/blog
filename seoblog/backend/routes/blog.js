const express = require('express')
const router = express.Router()
const { requireSignin, adminMiddleware, authMiddleware, canUpdateDeleteBlogs } = require('../controllers/auth');
const {create,
     list,
     listAllBlogCategoriesTags,
     read,
     remove,
     update,
     photo,
     listRelated,
     listSearch,
     listByUser
    } = require('../controllers/blog')

router.post('/blog', requireSignin, adminMiddleware, create)
router.get('/blogs', list)
router.post('/blogs-categories-tags', listAllBlogCategoriesTags)
router.get('/blog/:slug', read)
router.delete('/blog/:slug', requireSignin, adminMiddleware, remove)
router.put('/blog/:slug', requireSignin, adminMiddleware, update)
router.get('/blog/photo/:slug', photo)
router.post('/blogs/related', listRelated)
router.get('/blogs/search', listSearch)

//AUTH USER BLOG CRUD
router.post('/user/blog', requireSignin, authMiddleware, create)
router.get('/:username/blogs', listByUser)
router.delete('/user/blog/:slug', requireSignin, authMiddleware, canUpdateDeleteBlogs, remove)
router.put('/user/blog/:slug', requireSignin, authMiddleware, canUpdateDeleteBlogs, update)

module.exports = router;