import React, { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";
import { fadeIn, textVariant } from "../../utils/motion";
import { motion } from "framer-motion";

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);
    return () => {};
  }, [data]);

  return (
    <motion.div
      variants={fadeIn("left", 0.3)}
      initial="hidden"
      whileInView="show"
      className="card col-span-1"
    >
      <motion.div
        variants={textVariant(0.4)}
        initial="hidden"
        whileInView="show"
        className="flex items-center justify-between"
      >
        <h5 className="text-lg">Last 30 Days Expenses</h5>
      </motion.div>
      <CustomBarChart data={chartData} xAxisKey="category" />
    </motion.div>
  );
};

export default Last30DaysExpenses;
