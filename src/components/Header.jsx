import React from "react";
import { useState } from "react";

const Header = () => {
  const [signUp, setSignUp] = useState(false);
  const logoutfnc = () => {
    console.log("logout");
  };
  return (
    <>
      <div className=" p-4 bg-theme flex items-center justify-between sticky top-0 left-0 w-[100%]">
        <p className=" text-white font-bold text-[1.4rem] tracking-wider">
          Financely.
        </p>
        <div>
          {!signUp && (
            <p
              onClick={logoutfnc}
              className="text-white  font-semibold text-[18px] cursor-pointer hover:opacity-70 tracking-wider"
            >
              logout
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
