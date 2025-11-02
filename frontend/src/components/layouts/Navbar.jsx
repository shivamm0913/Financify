import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      variants={fadeIn("down", 0.2)}
      initial="hidden"
      whileInView="show"
      className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-3   px-7 sticky top-0 z-30"
    >
      <button
        className="block lg:hidden text-black"
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <img
        onClick={() => {
          navigate("/");
        }}
        src="what.png"
        alt=""
        className="w-35 md:ml-5 object-contain bg-transparent cursor-pointer"
      />

      {openSideMenu && (
        <div className="fixed top-[70px]  -ml-4 bg-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </motion.div>
  );
};

export default Navbar;
