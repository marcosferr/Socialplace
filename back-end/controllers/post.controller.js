const Post = require("../models/post.model");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/user.model");
// Create a post => /api/v1/post/create
module.exports.createPost = catchAsyncErrors(async (req, res) => {
  const { content } = req.body;
  const post = await Post.create({
    content,
    postedBy: req.user._id,
  });

  // Add the post to the user's posts
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $push: { posts: post._id } },
    { new: true }
  );

  res.status(201).json({
    success: true,
    message: "Post created successfully",
    post,
  });
});

// Get all posts => /api/v1/posts
module.exports.getAllPosts = catchAsyncErrors(async (req, res) => {
  const posts = await Post.find({})
    .populate("postedBy", "_id username")
    .populate("comments.postedBy", "_id username")
    .sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    posts,
  });
});

// Get all posts by a user => /api/v1/posts/:userId
module.exports.getPostsByUser = catchAsyncErrors(async (req, res) => {
  const posts = await Post.find({ postedBy: req.params.userId })
    .populate("postedBy", "_id username")
    .populate("comments.postedBy", "_id username")
    .sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    posts,
  });
});

// Get a single post => /api/v1/post/:postId
module.exports.getPost = catchAsyncErrors(async (req, res) => {
  const post = await Post.findById(req.params.postId)
    .populate("postedBy", "_id username")
    .populate("comments.postedBy", "_id username");
  res.status(200).json({
    success: true,
    post,
  });
});

// Update a post => /api/v1/post/:postId
module.exports.updatePost = catchAsyncErrors(async (req, res) => {
  const { content } = req.body;
  const post = await Post.findByIdAndUpdate(
    req.params.postId,
    {
      content,
    },
    { new: true }
  );
  res.status(200).json({
    success: true,
    message: "Post updated successfully",
    post,
  });
});

// Delete a post => /api/v1/post/:postId
module.exports.deletePost = catchAsyncErrors(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.postId);
  res.status(200).json({
    success: true,
    message: "Post deleted successfully",
    post,
  });
});

// Like a post => /api/v1/post/like/:postId
module.exports.likePost = catchAsyncErrors(async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.params.postId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true }
  );
  res.status(200).json({
    success: true,
    message: "Post liked successfully",
    post,
  });
});

// Unlike a post => /api/v1/post/unlike/:postId
module.exports.unlikePost = catchAsyncErrors(async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.params.postId,
    {
      $pull: { likes: req.user._id },
    },
    { new: true }
  );
  res.status(200).json({
    success: true,
    message: "Post unliked successfully",
    post,
  });
});

// Get all posts by users following => /api/v1/posts/following
module.exports.getPostsByFollowing = catchAsyncErrors(async (req, res) => {
  if (req.user.following.length === 0) {
    return res.status(200).json({
      success: true,
      posts: [],
    });
  }
  const posts = await Post.find({ postedBy: { $in: req.user.following } })
    .populate("postedBy", "_id username")
    .populate("comments.postedBy", "_id username")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    posts,
  });
});

// Comment on a post => /api/v1/post/comment/:postId
module.exports.commentOnPost = catchAsyncErrors(async (req, res) => {
  const { comment } = req.body;
  console.log(req.user);
  const post = await Post.findByIdAndUpdate(
    req.params.postId,
    {
      $push: { comments: { text: comment, postedBy: req.user._id } },
    },
    { new: true }
  )
    .populate("postedBy", "_id username")
    .populate("comments.postedBy", "_id username");
  res.status(200).json({
    success: true,
    message: "Comment added successfully",
    post,
  });
});
