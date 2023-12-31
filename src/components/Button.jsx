import React from "react";

const Button = ({ text, onClick, outlined, disabled }) => {
  return (
    <>
      <button
        disabled={disabled}
        className={`${
          !outlined
            ? " bg-theme text-white hover:bg-white hover:text-theme hover:border hover-border-theme"
            : "bg-white text-theme border-2  hover:bg-theme hover:text-white"
        }  text-center w-[100%] my-[1rem] mx-0 py-[0.6rem] px-2 text-[1rem] rounded-md font-semibold  flex items-center justify-center h-auto transition-all duration-300`}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
