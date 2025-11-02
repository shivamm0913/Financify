import React from "react";
import { LuAArrowUp, LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";
import { fadeIn } from "../../utils/motion";
import { motion } from "framer-motion";

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView="show"
      className="card"
    >
      <motion.div
        variants={fadeIn("right", 0.4)}
        initial="hidden"
        whileInView="show"
        className="flex items-center justify-between"
      >
        <h5 className="text-lg">Expanses</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </motion.div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((expense) => {
          return (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format("Do MMM YYYY")}
              amount={expense.amount}
              type="expense"
              hideDeleteBtn
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default ExpenseTransactions;
