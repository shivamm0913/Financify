import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";
import { fadeIn, textVariant } from "../../utils/motion";
import { motion } from "framer-motion";

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView="show"
      className="card"
    >
      <motion.div
        variants={textVariant(0.3)}
        initial="hidden"
        whileInView="show"
        className="flex items-center justify-between"
      >
        <h5 className="text-lg">Income Sources</h5>
        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" />
          Download
        </button>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income._id}
            title={income.source}
            icon={income.icon}
            date={moment(income.date).format("Do MMM YYYY")}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income._id)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default IncomeList;
