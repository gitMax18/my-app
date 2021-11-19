const router = require("express").Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/userControllers");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);

module.exports = router;
