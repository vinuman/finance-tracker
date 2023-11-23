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
import TransactionTable from "../components/TransactionTable";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [visible, setVisible] = useState(false);
  const [success, setSuccess] = useState(null);
  const [errorText, setErrorText] = useState("");
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalBalance, setTotalBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

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
      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
    } catch (e) {
      setErrorText(`Error: ${e}`);
      setSuccess(false);
      setVisible(true);
    }
  }

  const fetchTransactions = async () => {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      try {
        const querySnapshot = await getDocs(q);
        let transactionsArray = [];
        querySnapshot.forEach((doc) => {
          transactionsArray.push(doc.data());
        });
        setTransactions(transactionsArray);
      } catch (e) {
        setErrorText(`Error fetching transactions: ${e}`);
        setSuccess(false);
        setVisible(true);
      }
    }
    setLoading(false);
  };

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpenses(expensesTotal);
    setTotalBalance(incomeTotal - expensesTotal);
  };

  useEffect(() => {
    setErrorText(`Welcome to your DashBoard, ${user}`);
    setSuccess(true);
    setVisible(true);
    fetchTransactions();
    setTimeout(() => {
      setErrorText("");
      setSuccess(null);
      setVisible(false);
    }, 2000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setErrorText("");
      setSuccess(null);
      setVisible(false);
    }, 2000);
  }, [visible]);

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  return (
    <>
      <Header />
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          {" "}
          <Cards
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
            income={income}
            expenses={expenses}
            totalBalance={totalBalance}
          />
          <TransactionTable transactions={transactions} />
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
        </>
      )}
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
