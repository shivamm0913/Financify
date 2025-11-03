import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "/logout") {
      handleLogout();
    } else {
      navigate(route);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <motion.div
      variants={fadeIn("right", 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50  p-5  sticky top-[70px] z-20"
    >
      <motion.div
        variants={fadeIn("down", 0.3)}
        initial="hidden"
        whileInView="show"
        className="flex flex-col items-center justify-center gap-3 mt-3 mb-7"
      >
        {user?.profileImageUrl && user?.profileImageUrl.trim() !== "" ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="rounded-full w-12 h-12 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "";
            }}
          />
        ) : (
          <CharAvatar fullName={user?.fullName || ""} />
        )}

        <h5 className="text-gray-950 font-medium leading-6">
          {user?.fullName || ""}
        </h5>
      </motion.div>

      {SIDE_MENU_DATA.map((item, index) => (
        <motion.button
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView="show"
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] cursor-pointer ${
            activeMenu == item.label ? "text-white bg-primary" : ""
          } py-3 px-6 rounded-lg mb-3 `}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default SideMenu;
