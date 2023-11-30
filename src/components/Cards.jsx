import React, { useState } from "react";
import { Row, Card } from "antd";
import Button from "./Button";
import { collection, getDocs, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";

const Cards = ({
  showExpenseModal,
  showIncomeModal,
  income,
  expenses,
  totalBalance,
  setTransactions,
}) => {
  const [user] = useAuthState(auth);
  const [visible, setVisible] = useState(false);
  const [success, setSuccess] = useState(null);
  const [errorText, setErrorText] = useState("");
  async function deleteAllTransactions(userId) {
    try {
      const userTransactionsRef = collection(
        db,
        `users/${userId}/transactions`
      );
      const querySnapshot = await getDocs(userTransactionsRef);

      const deletePromises = querySnapshot.docs.map(async (doc) => {
        await deleteDoc(doc.ref);
      });

      await Promise.all(deletePromises);

      setErrorText(`All transactions deleted`);
      setSuccess(true);
      setVisible(true);
      setTransactions([]); // Assuming you want to clear the transactions array
    } catch (e) {
      setErrorText(`Error: ${e}`);
      setSuccess(false);
      setVisible(true);
    }
  }

  const handleReset = () => {
    const userResponse = prompt("Do you want to proceed? (yes/no)");

    if (userResponse !== null) {
      // User clicked OK or entered a response

      // Convert the user input to lowercase for case-insensitive comparison
      const lowerCaseResponse = userResponse.toLowerCase();

      if (lowerCaseResponse === "yes") {
        // User wants to proceed, take action accordingly
        deleteAllTransactions(user.uid);
      } else if (lowerCaseResponse === "no") {
        // User doesn't want to proceed, take action accordingly
        alert("Action canceled by the user.");
      } else {
        // Invalid response
        alert("Select 'yes' or 'no'.");
      }
    } else {
      // User clicked Cancel
      alert("Action canceled by the user.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Row className="flex flex-wrap flex-1 gap-[16px] justify-between items-center my-[2rem] mx-auto w-[90%] p-0">
          <Card
            className=" shadow-md min-w-[350px] m-[2rem] rounded-md"
            title="Current Balance"
          >
            <p className=" m-0">${totalBalance}</p>
            <Button onClick={handleReset} text="Reset Balance" />
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
