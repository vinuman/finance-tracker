import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  const logoutfnc = () => {
    try {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          navigate("/");
          console.log("user>>", user);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="py-4 px-8 bg-theme flex items-center justify-between sticky top-0 left-0 w-[100%] z-30">
        <p className=" text-white font-bold text-[1.4rem] tracking-wider">
          Financely.
        </p>
        <div className="flex items-center justify-around w-[8rem]">
          {user?.photoURL && location.pathname !== "/" && (
            <img
              className="w-[2rem] h-[2rem] rounded-full"
              src={user.photoURL ? user.photoURL : ""}
              alt="display pic"
            ></img>
          )}

          {location.pathname !== "/" && (
            <p
              onClick={logoutfnc}
              className="text-white text-[18px] cursor-pointer hover:opacity-70 tracking-wide"
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
