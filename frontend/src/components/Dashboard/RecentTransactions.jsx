import React from "react";
import { IoMdDocument } from "react-icons/io";
import { LuAArrowDown, LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import { fadeIn } from "../../utils/motion";
import { motion } from "framer-motion";

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView="show"
      className="card border"
    >
      <motion.div
        variants={fadeIn("left", 0.4)}
        initial="hidden"
        whileInView="show"
        className="flex items-center justify-between"
      >
        <h5 className="text-lg">Recent Transactions</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </motion.div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item) => {
          return (
            <TransactionInfoCard
              key={item._id}
              title={item.type == "expense" ? item.category : item.source}
              date={moment(item.date).format("Do MMM YYYY")}
              icon={item.icon}
              amount={item.amount}
              type={item.type}
              hideDeleteBtn
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default RecentTransactions;
