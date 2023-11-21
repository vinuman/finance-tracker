import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

const Error = ({ message, visible, success, onClick }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="error"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.4 }}
          className={`w-[300px] min-h-[48px] h-auto rounded-lg absolute border-2 shadow-xl top-4 right-4 justify-center items-center p-4 ${
            success ? "bg-green-700" : "bg-red-700"
          }`}
        >
          <p className="text-white text-[1.2rem] font-normal tracking-wide">
            {message} !
          </p>

          <div
            onClick={onClick}
            className="absolute top-2 right-2 ml-3 mb-6 cursor-pointer"
          >
            <Icon
              icon="carbon:close-outline"
              color="white"
              width="20"
              height="20"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Error;
