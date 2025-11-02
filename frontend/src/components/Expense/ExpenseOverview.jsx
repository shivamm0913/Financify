import React, { useEffect, useState } from "react";
import { prepareExpenseLineChart } from "../../utils/helper";
import { LuPlus } from "react-icons/lu";
import CustomLineChart from "../Charts/CustomLineChart";
import { fadeIn, textVariant } from "../../utils/motion";
import { motion } from "framer-motion";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChart(transactions);
    setChartData(result);
    return () => {};
  }, [transactions]);

  return (
    <motion.div
      variants={fadeIn("left", 0.3)}
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
        <div className="">
          <h5 className="text-lg">Expense Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your spending trends over time and gain insights into where
            your money goes.
          </p>
        </div>
        <button className="add-btn" onClick={onAddExpense}>
          <LuPlus className="" />
          Add Expense
        </button>
      </motion.div>
      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </motion.div>
  );
};

export default ExpenseOverview;
