const Post = require('../models/Post');

exports.getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  let imageUrl = '';

  if (req.file) {
    imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  }

  if (!title || !content) {
    return res.status(400).json({ msg: 'Title and content are required' });
  }

  try {
    const post = new Post({
      title,
      content,
      imageUrl,
      author: req.user._id,
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, author: req.user._id });
    if (!post) return res.status(404).json({ msg: 'Post not found or unauthorized' });

    await post.deleteOne();
    res.json({ msg: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.editPost = async (req, res) => {
  const { title, content } = req.body;
  let imageUrl;

  if (req.file) {
    imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  }

  try {
    const post = await Post.findOne({ _id: req.params.id, author: req.user._id });
    if (!post) return res.status(404).json({ msg: 'Post not found or unauthorized' });

    post.title = title || post.title;
    post.content = content || post.content;
    if (imageUrl) post.imageUrl = imageUrl;

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
