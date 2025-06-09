const express = require('express');
const router = express.Router();
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');
const Post = require('../models/Post'); 

const {
  getMyPosts,
  createPost,
  deletePost,
  editPost,
} = require('../controllers/postController');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});
const upload = multer({ storage });

//  GET all posts of logged-in user
router.get('/', authMiddleware, getMyPosts);

//  GET single post by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'email');
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

//  POST create a new post
router.post('/', authMiddleware, upload.single('image'), createPost);

//  PUT update a post
router.put('/:id', authMiddleware, upload.single('image'), editPost);

//  DELETE a post
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;
