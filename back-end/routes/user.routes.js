const router = require("express").Router();
const { isAuthenticatedUser } = require("../middlewares/auth");
const { getProfile } = require("../controllers/user.controller");

router.route("/me").get(isAuthenticatedUser, getProfile);

module.exports = router;
