import React, { useEffect, useState, useRef } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { LuUpload } from "react-icons/lu";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../../utils/motion";

const UserProfile = () => {
  useUserAuth();
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    profileImageUrl: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const fileInputRef = useRef(null); // 👈 reference to hidden file input

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.PROFILE.GET_PROFILE);
      setOriginalData(res.data);
      setUserData(res.data);
    } catch (err) {
      toast.error("Failed to load user profile");
    }
  };

  const handleUpdate = async () => {
    if (
      !selectedFile &&
      userData.fullName.trim() === originalData.fullName.trim()
    ) {
      toast("No changes detected", { icon: "⚠️" });
      return;
    }

    const formData = new FormData();
    formData.append("fullName", userData.fullName);
    if (selectedFile) formData.append("profilePic", selectedFile);

    try {
      await axiosInstance.put(API_PATHS.PROFILE.UPDATE_PROFILE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Profile updated successfully!");
      fetchUserDetails();
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <DashboardLayout activeMenu="Profile">
      <motion.div
        variants={fadeIn("left", 0.2)}
        initial="hidden"
        whileInView="show"
        className="p-8 flex w-full   mx-auto flex-col items-center justify-center text-center"
      >
        <motion.h2
          variants={fadeIn("down", 0.3)}
          initial="hidden"
          whileInView="show"
          className="text-2xl font-semibold w-full text-green-700 mb-6"
        >
          Profile Settings
        </motion.h2>

        {/* Profile Card */}
        <div className="bg-white shadow-md rounded-2xl w-[50%] p-6 flex flex-col items-center gap-4 border border-green-100">
          {/* Profile Image */}
          <motion.div
            variants={fadeIn("down", 0.3)}
            initial="hidden"
            whileInView="show"
            className="relative group"
          >
            <img
              src={
                selectedFile
                  ? URL.createObjectURL(selectedFile)
                  : userData.profileImageUrl || "/default-avatar.png"
              }
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-green-500 shadow-md transition-transform duration-200 group-hover:scale-105"
            />

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="hidden"
            />

            {/* Upload Icon Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full shadow-md hover:bg-green-700 transition duration-200"
              title="Change Profile Picture"
            >
              <LuUpload className="w-5 h-5" />
            </button>
          </motion.div>

          {/* User Info Inputs */}
          <div className="mt-4 w-full flex flex-col gap-4">
            <motion.div
              variants={fadeIn("right", 0.4)}
              initial="hidden"
              whileInView="show"
              className="text-left"
            >
              <label className="text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                value={userData.fullName}
                onChange={(e) =>
                  setUserData({ ...userData, fullName: e.target.value })
                }
                className="border border-green-300 rounded-lg w-full p-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your full name"
              />
            </motion.div>

            <motion.div
              variants={fadeIn("left", 0.4)}
              initial="hidden"
              whileInView="show"
              className="text-left"
            >
              <label className="text-sm font-medium text-gray-600">Email</label>
              <input
                type="text"
                value={userData.email}
                disabled
                className="  rounded-lg w-full p-2 mt-1 text-sm text-  opacity-50 "
              />
            </motion.div>

            <motion.div
              variants={fadeIn("up", 0.5)}
              initial="hidden"
              whileInView="show"
            >
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white w-full px-5 py-2 rounded-lg mt-2 hover:bg-green-700 transition duration-200 shadow-sm"
              >
                Save Changes
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default UserProfile;
