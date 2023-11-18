import React from "react";
import { useState } from "react";
import Button from "./Button";

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
  return (
    <>
      <div className=" max-w-[600px] h-auto w-[70%] shadow-lg rounded-lg p-4 flex flex-col items-center  ">
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
            text="Sign up using email and Password"
            outlined={false}
            onClick={() => console.log("clicked")}
          />
          <p className=" text-[1rem] font-medium">Or</p>
          <Button
            text="Sign up using Google"
            outlined={true}
            onClick={() => console.log("clicked")}
          />
        </div>
      </div>
    </>
  );
};

export default SignUpSignIn;
