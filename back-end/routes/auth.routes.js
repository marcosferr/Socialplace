const { register, login, logout } = require("../controllers/auth.controller");
const { isAuthenticatedUser } = require("../middlewares/auth");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticatedUser, logout);

module.exports = router;
