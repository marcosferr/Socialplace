const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");
const { isAuthenticatedUser } = require("../middlewares/auth");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticatedUser, logout);
router.post("/password/forgot", forgotPassword);
router.post("/password/reset/:token", resetPassword);
module.exports = router;
