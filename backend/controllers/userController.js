const User = require("../models/User");

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.updateUserProfile = async (req, res) => {
  try {
    const { fullName } = req.body;

    const updateFields = {};
    const BASE_URL =
      process.env.BASE_URL || "https://financify-lxg1.onrender.com/";

    // ✅ Only if a new file is uploaded
    if (req.file) {
      updateFields.profileImageUrl = `${BASE_URL}uploads/${req.file.filename}`;
    }

    // ✅ Only if name provided
    if (fullName && fullName.trim() !== "") {
      updateFields.fullName = fullName;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};
