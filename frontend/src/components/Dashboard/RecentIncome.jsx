import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";
import { fadeIn, textVariant } from "../../utils/motion";
import { motion } from "framer-motion";

const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView="show"
      className="card"
    >
      <motion.div
        variants={textVariant(0.4)}
        initial="hidden"
        whileInView="show"
        className="flex items-center justify-between"
      >
        <h5 className="text-lg"> Recent Income</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </motion.div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((income) => {
          return (
            <TransactionInfoCard
              key={income._id}
              title={income.category}
              icon={income.icon}
              date={moment(income.date).format("Do MMM YYYY")}
              amount={income.amount}
              type="income"
              hideDeleteBtn
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default RecentIncome;
