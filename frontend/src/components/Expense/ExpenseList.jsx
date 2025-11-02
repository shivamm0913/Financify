import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";
import { fadeIn, textVariant } from "../../utils/motion";
import { motion } from "framer-motion";

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    <motion.div
      variants={fadeIn("right", 0.3)}
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
        <h5 className="text-lg">All Expenses</h5>
        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" /> Download
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense._id)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ExpenseList;
