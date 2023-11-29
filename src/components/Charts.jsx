import React from "react";
import { Line, Pie } from "@ant-design/charts";

const Charts = ({ sortedTransactions }) => {
  const data = sortedTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });

  const spendingData = sortedTransactions.filter((transactions) => {
    if (transactions.type == "expense") {
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
      case "food":
        newSpendings[0].amount += item.amount;
        break;
      case "drinks":
        newSpendings[1].amount += item.amount;
        break;
      case "education":
        newSpendings[2].amount += item.amount;
        break;
      case "office":
        newSpendings[3].amount += item.amount;
        break;
      case "grocery":
        newSpendings[4].amount += item.amount;
        break;
      case "fuel":
        newSpendings[5].amount += item.amount;
        break;
      case "bills":
        newSpendings[6].amount += item.amount;
        break;
      case "pet":
        newSpendings[7].amount += item.amount;
        break;
      case "cig":
        newSpendings[8].amount += item.amount;
        break;
      default:
        newSpendings[9].amount += item.amount; // Others
        break;
    }
  });

  const config = {
    data: data,
    width: 1200,
    height: 400,
    autoFit: false,
    xField: "date",
    yField: "amount",
  };
  const spendingConfig = {
    data: newSpendings,
    width: 300,
    angleField: "amount",
    colorField: "tag",
  };

  let chart;
  let pieChart;

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-8 h-auto w-[100%] p-8 mb-8 rounded-md">
        <div className="shadow-md p-4 w-[100%]">
          <h2 className="text-[1.2rem] mb-8">Spending Graph</h2>
          <Line
            {...config}
            onReady={(chartInstance) => (chart = chartInstance)}
          />
        </div>
        <div className="shadow-md p-4 w-[100%]">
          <h2 className="text-[1.2rem] mb-8 ml-8">Spending chart</h2>
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
