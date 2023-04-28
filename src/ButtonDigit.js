import React from "react";
import { ACTIONS } from "./App";

const ButtonDigit = ({ digit, dispatch }) => {
  return (
    <button
      className="border-2 border-[#1f1b4b] p-8 rounded-sm outline-none cursor-pointer hover:bg-[#b6b1f1]"
      onClick={() =>
        dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: digit } })
      }
    >
      {digit}
    </button>
  );
};

export default ButtonDigit;
