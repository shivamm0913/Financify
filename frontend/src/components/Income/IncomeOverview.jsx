import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../../utils/helper";
import { data } from "react-router-dom";
import { fadeIn } from "../../utils/motion";
import { motion } from "framer-motion";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
    <motion.div
      variants={fadeIn("left", 0.2)}
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
        <div className="">
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your earning over time and analyze your income trends.
          </p>
        </div>

        <button className="add-btn" onClick={onAddIncome}>
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </motion.div>
      <div className="mt-10">
        <CustomBarChart data={chartData} xAxisKey="month" />
      </div>
    </motion.div>
  );
};

export default IncomeOverview;
