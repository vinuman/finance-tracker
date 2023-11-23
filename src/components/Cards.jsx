import React from "react";
import { Row, Card } from "antd";
import Button from "./Button";

const Cards = ({
  showExpenseModal,
  showIncomeModal,
  income,
  expenses,
  totalBalance,
}) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Row className="flex flex-wrap flex-1 gap-[16px] justify-between items-center my-[2rem] mx-auto w-[90%] p-0">
          <Card
            className=" shadow-md min-w-[350px] m-[2rem] rounded-md"
            title="Current Balance"
          >
            <p className=" m-0">${totalBalance}</p>
            <Button text="Reset Balance" />
          </Card>
          <Card
            className=" shadow-md min-w-[350px] m-[2rem] rounded-md"
            title="Total Income"
          >
            <p className=" m-0">${income}</p>
            <Button text="Add Income" onClick={showIncomeModal} />
          </Card>
          <Card
            className=" shadow-md min-w-[350px] m-[2rem] rounded-md"
            title="Total Expenses"
          >
            <p className=" m-0">${expenses}</p>
            <Button text="Add Expense" onClick={showExpenseModal} />
          </Card>
        </Row>
      </div>
    </>
  );
};

export default Cards;
