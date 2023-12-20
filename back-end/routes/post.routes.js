const {
  createPost,
  getAllPosts,
  getPostsByUser,
  getPost,
  updatePost,
  deletePost,
  getPostsByFollowing,
  commentOnPost,
  likePost,
  unlikePost,
} = require("../controllers/post.controller");
const { isAuthenticatedUser } = require("../middlewares/auth");
const router = require("express").Router();

router.route("/posts/create").post(isAuthenticatedUser, createPost);
router.route("/posts/").get(getAllPosts);
router.route("/posts/following").get(isAuthenticatedUser, getPostsByFollowing);
router.route("/posts/user/:userId").get(getPostsByUser);
router.route("/posts/:postId/comment").post(isAuthenticatedUser, commentOnPost);
router.route("/posts/:postId").get(getPost);
router.route("/posts/:postId").put(updatePost);
router.route("/posts/:postId").delete(deletePost);
router.route("/posts/:postId/like").put(isAuthenticatedUser, likePost);
router.route("/posts/:postId/unlike").put(isAuthenticatedUser, unlikePost);
module.exports = router;
