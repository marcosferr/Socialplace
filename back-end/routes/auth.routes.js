const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");
const passport = require("passport");

const { isAuthenticatedUser } = require("../middlewares/auth");
const sendToken = require("../utils/jwtToken");
const router = require("express").Router();
const CLIENT_URL = process.env.CLIENT_URL;

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticatedUser, logout);
router.post("/password/forgot", forgotPassword);
router.post("/password/reset/:token", resetPassword);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.status(200).json({ success: true });
  }
);
router.get("/login/success", (req, res) => {
  if (req.user) {
    sendToken(req.user, 200, res);
  }
  res.redirect(CLIENT_URL);
});
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "User failed to authenticate.",
  });
  res.redirect(CLIENT_URL);
});
module.exports = router;
