import React from "react";
import { textVariant } from "../../utils/motion";
import { motion } from "framer-motion";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
      <div
        className={`w-14 h-14 flex  items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <motion.h6
          variants={textVariant(0.5)}
          initial="hidden"
          whileInView="show"
          className="text-sm text-gray-500 mb-1"
        >
          {label}
        </motion.h6>
        <motion.span
          variants={textVariant(0.9)}
          initial="hidden"
          whileInView="show"
          className="text-[22px]"
        >
          ${value}
        </motion.span>
      </div>
    </div>
  );
};

export default InfoCard;
