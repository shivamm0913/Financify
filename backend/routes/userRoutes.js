const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware"); // same auth you use for protected routes

// ✅ Get user profile
router.get("/me", protect, getUserProfile);

// ✅ Update user profile
router.put(
  "/update",
  protect,
  upload.single("profilePic"),
  updateUserProfile
);

module.exports = router;
