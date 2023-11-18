import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const Error = ({ message, visible, success, onClick }) => {
  return (
    <>
      <motion.div
        onClick={onClick}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className={`w-[300px] min-h-[48px] h-auto rounded-lg absolute top-4 right-4 justify-center items-center p-4 ${
          visible ? "flex" : "hidden"
        } ${success ? "bg-green-700" : "bg-red-700"}`}
      >
        <p className="text-white text-[1.2rem] font-medium tracking-wide">
          {message} !
        </p>

        <div className=" absolute top-2 right-2 ml-3 mb-3 cursor-pointer">
          <Icon
            icon="carbon:close-outline"
            color="white"
            width="24"
            height="24"
          />
        </div>
      </motion.div>
    </>
  );
};

export default Error;
