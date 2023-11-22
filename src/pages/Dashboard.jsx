import React, { useEffect, useState } from "react";
import Error from "../components/Error";
import { useSelector } from "react-redux";
import Header from "../components/Header";

const Dashboard = () => {
  const [visible, setVisible] = useState(false);
  const [success, setSuccess] = useState(null);
  const [errorText, setErrorText] = useState("");

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    setErrorText(`Welcome to your DashBoard, ${user}`);
    setSuccess(true);
    setVisible(true);
    setTimeout(() => {
      setErrorText("");
      setSuccess(null);
      setVisible(false);
    }, 2000);
  }, []);

  return (
    <>
      <Header />

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
