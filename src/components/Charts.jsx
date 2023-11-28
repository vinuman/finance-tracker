import React from "react";
import { Line } from "@ant-design/charts";

const Charts = ({ sortedTransactions }) => {
  const data = sortedTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });

  const config = {
    data,
    width: 800,
    height: 400,
    autoFit: false,
    xField: "date",
    yField: "amount",
    point: {
      size: 5,
      shape: "diamond",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
  };

  let chart;

  return (
    <>
      <div>
        <Line
          {...config}
          onReady={(chartInstance) => (chart = chartInstance)}
        />
      </div>
    </>
  );
};

export default Charts;
