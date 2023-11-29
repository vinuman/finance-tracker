import React from "react";
import { Line, Pie } from "@ant-design/charts";

const Charts = ({ sortedTransactions }) => {
  const data = sortedTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });

  const spendingData = sortedTransactions.filter((transactions) => {
    if (transactions.type == "expenses") {
      return { tag: transactions.tag, amount: transactions.amount };
    }
  });

  let finalSpendings = spendingData.reduce((acc, obj) => {
    let key = obj.tag;
    if (!acc[key]) {
      acc[key] = { tag: obj.tag, amount: obj.amount };
    } else {
      acc[key].amount += obj.amount;
    }
    return acc;
  }, {});

  let newSpendings = [
    { tag: "Food", amount: 0 },
    { tag: "Drinks", amount: 0 },
    { tag: "Education", amount: 0 },
    { tag: "Office", amount: 0 },
    { tag: "Grocery", amount: 0 },
    { tag: "Fuel", amount: 0 },
    { tag: "Monthly fixed bills", amount: 0 },
    { tag: "Pet Care", amount: 0 },
    { tag: "Cigarette", amount: 0 },
    { tag: "Others", amount: 0 },
  ];

  spendingData.forEach((item) => {
    switch (item.tag) {
      case "Food":
        newSpendings[0].amount += item.amount;
        break;
      case "Drinks":
        newSpendings[1].amount += item.amount;
        break;
      case "Education":
        newSpendings[2].amount += item.amount;
        break;
      case "Office":
        newSpendings[3].amount += item.amount;
        break;
      case "Grocery":
        newSpendings[4].amount += item.amount;
        break;
      case "Fuel":
        newSpendings[5].amount += item.amount;
        break;
      case "Monthly fixed bills":
        newSpendings[6].amount += item.amount;
        break;
      case "Pet Care":
        newSpendings[7].amount += item.amount;
        break;
      case "Cigarette":
        newSpendings[8].amount += item.amount;
        break;
      default:
        newSpendings[9].amount += item.amount; // Others
        break;
    }
  });

  const config = {
    data: data,
    width: 800,
    height: 400,
    autoFit: false,
    xField: "date",
    yField: "amount",
  };
  const spendingConfig = {
    data: newSpendings,
    width: 800,
    angleField: "amount",
    colorField: "tag",
  };

  let chart;
  let pieChart;

  return (
    <>
      <div className="flex justify-between items-center h-auto w-[95%] p-[2rem] rounded-md shadow-md">
        <div>
          <h2>Your chart</h2>
          <Line
            {...config}
            onReady={(chartInstance) => (chart = chartInstance)}
          />
        </div>
        <div>
          <h2>Your Pie chart</h2>
          <Pie
            {...spendingConfig}
            onReady={(chartInstance) => (pieChart = chartInstance)}
          />
        </div>
      </div>
    </>
  );
};

export default Charts;
