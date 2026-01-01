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
    
    // Use Vercel backend URL or fallback to environment variable
    const BASE_URL = process.env.BASE_URL || 
                     process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                     "https://financify-theta.vercel.app";

    // ✅ Only if a new file is uploaded
    if (req.file) {
      // For Vercel, files in /tmp are temporary and can't be served statically
      // Convert to base64 data URL for storage in database
      const fs = require("fs");
      const imageBuffer = fs.readFileSync(req.file.path);
      const base64Image = imageBuffer.toString("base64");
      const imageUrl = `data:${req.file.mimetype};base64,${base64Image}`;
      
      updateFields.profileImageUrl = imageUrl;
      
      // Clean up temp file
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error("Error deleting temp file:", unlinkError);
      }
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
