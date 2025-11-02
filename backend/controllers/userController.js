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
    // ✅ Only build profileImageUrl if a new file is uploaded
    let profileImageUrl;
    const BASE_URL =
      process.env.BASE_URL || "https://financify-lxg1.onrender.com";
    profileImageUrl = `${BASE_URL}uploads/${req.file.filename}`;

    // ✅ Prepare only provided fields for update
    const updateFields = {};
    if (fullName && fullName.trim() !== "") updateFields.fullName = fullName;
    if (profileImageUrl) updateFields.profileImageUrl = profileImageUrl;

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
    res.status(500).json({ message: "Upadte failed" });
  }
};
