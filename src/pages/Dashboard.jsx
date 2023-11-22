import React, { useEffect, useState } from "react";
import Error from "../components/Error";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Cards from "../components/Cards";
import AddExpenseModal from "../components/modals/AddExpense";
import AddIncomeModal from "../components/modals/AddIncome";

const Dashboard = () => {
  const [visible, setVisible] = useState(false);
  const [success, setSuccess] = useState(null);
  const [errorText, setErrorText] = useState("");
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
  };

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      setErrorText(`Welcome to your DashBoard, ${user}`);
      setSuccess(true);
      setVisible(true);
    }

    setTimeout(() => {
      setErrorText("");
      setSuccess(null);
      setVisible(false);
    }, 2000);
  }, []);

  return (
    <>
      <Header />
      <Cards
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
      />
      <AddExpenseModal
        isExpenseModalVisible={isExpenseModalVisible}
        handleExpenseCancel={handleExpenseCancel}
        onFinish={onFinish}
      />
      <AddIncomeModal
        isIncomeModalVisible={isIncomeModalVisible}
        handleIncomeCancel={handleIncomeCancel}
        onFinish={onFinish}
      />

      <Error
        onClick={() => setVisible(false)}
        visible={visible}
        success={success}
        message={errorText}
      />
    </>
  );
};

export default Dashboard;
