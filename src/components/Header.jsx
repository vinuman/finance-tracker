import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

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
      <div className="py-4 px-8 bg-theme flex items-center justify-between sticky top-0 left-0 w-[100%]">
        <p className=" text-white font-bold text-[1.4rem] tracking-wider">
          Financely.
        </p>
        <div>
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
