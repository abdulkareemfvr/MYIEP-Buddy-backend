const {
  updateUser,
  deleteUser,
  affiliateUpdateUser,
  affiliateDeleteUser,
} = require("../../../controllers/user.controllers");
const {
  loginUser,
  registerUser,
  affiliateUserCreate,
  affiliateUserGet,
} = require("../../../controllers/user.controllers");
const express = require("express");
const router = express.Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);

router.route("/affiliate").post(affiliateUserCreate);

router.route("/:id").put(updateUser).delete(deleteUser);

router
  .route("/affiliate/:id")
  .get(affiliateUserGet)
  .put(affiliateUpdateUser)
  .delete(affiliateDeleteUser);

module.exports = router;
