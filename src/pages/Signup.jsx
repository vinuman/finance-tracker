import React from "react";
import Header from "../components/Header";
import SignUpSignIn from "../components/SignUpSignIn";

const Signup = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center w-[100vw] h-[90vh]">
        <SignUpSignIn />
      </div>
    </>
  );
};

export default Signup;
