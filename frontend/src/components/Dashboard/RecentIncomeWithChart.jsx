import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";
import { fadeIn, textVariant } from "../../utils/motion";
import { motion } from "framer-motion";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    if (!Array.isArray(data)) return;
    const dataArr = data?.map((item) => ({
      name: item?.source || "Unknown",
      amount: Number(item?.amount) || 0,
    }));
    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
    return () => {};
  }, [data]);

  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView="show"
      className="card "
    >
      <motion.div
        variants={textVariant(0.4)}
        initial="hidden"
        whileInView="show"
        className="flex items-center justify-between"
      >
        <h5 className="text-lg">Last 60 Days Income</h5>
      </motion.div>
      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`$${totalIncome}`}
        colors={COLORS}
        showTextAnchor
      />
    </motion.div>
  );
};

export default RecentIncomeWithChart;
