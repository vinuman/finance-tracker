import React from "react";
import { useState, useEffect } from "react";
import Button from "./Button";

import validator from "validator";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Error from "./Error";

const SignUpSignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameValid, setNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordLength, setPasswordLength] = useState(true);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [success, setSuccess] = useState(null);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
      setErrorText("");
      setSuccess(null);
    }, 6000);
  }, [visible]);

  //Authenticate the user or create a new account
  const signUpWithEmail = () => {
    setLoading(true);
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword === "" ||
      !validator.isEmail(email) ||
      password !== confirmPassword ||
      password.length < 6
    ) {
      name.trim() === "" ? setNameValid(false) : setNameValid(true);
      email.trim() === "" ? setEmailValid(false) : setEmailValid(true);
      password.trim() === "" ? setPasswordValid(false) : setPasswordValid(true);
      confirmPassword === ""
        ? setConfirmPasswordValid(false)
        : setConfirmPassword(true);
      !validator.isEmail(email) ? setEmailValid(false) : setEmailValid(true);
      password !== confirmPassword
        ? setPasswordMatch(false)
        : setPasswordMatch(true);
      password.length < 6 ? setPasswordLength(false) : setPasswordLength(true);
      setLoading(false);
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user.uid);
          setErrorText("user created");
          setVisible(true);
          setSuccess(true);
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");

          // Create a doc with user id
          createDoc(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorText(errorMessage);
          setVisible(true);
          setSuccess(false);
          // ..
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  function createDoc() {
    //create a doc
    //Ensure that doc with the user ID does not exist
  }
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div
        onClick={() => setVisible(false)}
        className=" max-w-[600px] h-auto w-[70%] shadow-lg rounded-lg p-4 flex flex-col items-center  "
      >
        <h2 className=" font-semibold text-[1.8rem] text-center mt-0 mb-[1rem] tracking-wide">
          Sign up on<span className=" text-theme"> Financely.</span>
        </h2>

        <div className="flex flex-col my-4 w-[90%]">
          <label className=" mb-1  text-[16px] text-gray-600 px-2 opacity-90 ">
            Full Name
          </label>
          <input
            onChange={(e) => {
              setName(e.target.value);
              setNameValid(true);
            }}
            className={`outline-none border-b border-gray-600   px-2 ${
              !nameValid ? "border-red-600" : "border-gray-600"
            }`}
            type="text"
            placeholder="John Doe"
            value={name}
          ></input>
          {!nameValid && (
            <p className=" text-red-600 text-[14px] px-2">
              Please enter your name
            </p>
          )}
        </div>
        <div className="flex flex-col mt-2 my-4 w-[90%]">
          <label className=" mb-1  text-[16px] text-gray-600 px-2 opacity-90">
            Email
          </label>

          <input
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailValid(true);
            }}
            className={`outline-none border-b border-gray-600   px-2 ${
              !emailValid ? "border-red-600" : "border-gray-600"
            }`}
            type="text"
            placeholder="JohnDoe@gmail.com"
            value={email}
          ></input>
          {!emailValid && (
            <p className=" text-red-600 text-[14px] px-2">
              Please enter a valid email ID
            </p>
          )}
        </div>
        <div className="flex flex-col mt-2 my-4 w-[90%]">
          <label className=" mb-1  text-[16px] text-gray-600 px-2 opacity-90">
            Password
          </label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordValid(true);
              setPasswordLength(true);
            }}
            className={`outline-none border-b border-gray-600 px-2 ${
              !passwordValid ? "border-red-600" : "border-gray-600"
            }`}
            type="password"
            placeholder="Example123"
            value={password}
          ></input>
          {!passwordValid && (
            <p className=" text-red-600 text-[14px] px-2">
              Please enter a password
            </p>
          )}
          {!passwordLength && (
            <p className=" text-red-600 text-[14px] px-2">
              The password length must be greater than 5
            </p>
          )}
        </div>
        <div className="flex flex-col mt-2 my-4 w-[90%]">
          <label className="text-[16px] mb-1 text-gray-600 px-2 opacity-90">
            Confirm Password
          </label>
          <input
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setConfirmPasswordValid(true);
              setPasswordMatch(true);
            }}
            className={`outline-none border-b border-gray-600 px-2 ${
              !confirmPasswordValid ? "border-red-600" : "border-gray-600"
            }`}
            type="password"
            placeholder="Example123"
            value={confirmPassword}
          ></input>
          {!confirmPasswordValid && (
            <p className=" text-red-600 text-[14px] px-2">
              Please confirm the password
            </p>
          )}
          {!passwordMatch && confirmPasswordValid && (
            <p className=" text-red-600 text-[14px] px-2">
              The entered password does not match
            </p>
          )}
        </div>
        <div className="w-[100%] flex flex-col items-center">
          <Button
            disabled={loading}
            text={loading ? "Loading..." : "Sign up using email and Password"}
            outlined={false}
            onClick={signUpWithEmail}
          />
          <p className=" text-[1rem] font-medium">Or</p>
          <Button
            disabled={loading}
            text={loading ? "Loading..." : "Sign up using Google"}
            outlined={true}
            onClick={() => console.log("clicked")}
          />
        </div>
      </div>

      <Error visible={visible} success={success} message={errorText} />
    </div>
  );
};

export default SignUpSignIn;
