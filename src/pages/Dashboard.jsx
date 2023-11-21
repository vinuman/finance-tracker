import React, { useEffect, useState } from "react";
import Error from "../components/Error";

const Dashboard = () => {
  const [visible, setVisible] = useState(false);
  const [success, setSuccess] = useState(null);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    setVisible(true);
    setSuccess(true);
    setErrorText("Login in success");
    setTimeout(() => {
      setVisible(false);
      setSuccess(null);
      setErrorText("");
    }, 2000);
  }, []);

  return (
    <>
      <div>Dashboard</div>
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
