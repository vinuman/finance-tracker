import React, { useEffect, useState } from "react";
import Error from "../components/Error";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Cards from "../components/Cards";
import AddExpenseModal from "../components/modals/AddExpense";
import AddIncomeModal from "../components/modals/AddIncome";
import { auth, db } from "../firebase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [visible, setVisible] = useState(false);
  const [success, setSuccess] = useState(null);
  const [errorText, setErrorText] = useState("");
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const sampleTransactions = [
    {
      name: "Pay day",
      type: "income",
      date: "2023-01-15",
      amount: 2000,
      tag: "salary",
    },
    {
      name: "Dinner",
      type: "expense",
      date: "2023-01-20",
      amount: 500,
      tag: "food",
    },
    {
      name: "Books",
      type: "expense",
      date: "2023-01-25",
      amount: 300,
      tag: "education",
    },
  ];

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
    addTransaction(newTransaction);
    setTransactions([...transactions, newTransaction]);
    setIsExpenseModalVisible(false);
    setIsIncomeModalVisible(false);
  };

  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      setErrorText(`Transaction added`);
      setSuccess(true);
      setVisible(true);
    } catch (e) {
      setErrorText(`Error: ${e}`);
      setSuccess(false);
      setVisible(true);
    }
  }

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
    }
    setLoading(false);
  }

  useEffect(() => {
    setErrorText(`Welcome to your DashBoard, ${user}`);
    setSuccess(true);
    setVisible(true);

    setTimeout(() => {
      setErrorText("");
      setSuccess(null);
      setVisible(false);
    }, 2000);
  }, [user]);

  useEffect(() => {
    setTimeout(() => {
      setErrorText("");
      setSuccess(null);
      setVisible(false);
    }, 2000);
  }, [visible]);

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
