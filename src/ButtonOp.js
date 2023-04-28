import React from "react";
import { ACTIONS } from "./App";

const ButtonOp = ({ operand, dispatch }) => {
  return (
    <button
      className="border-2 border-[#1f1b4b] p-8 rounded-sm outline-none cursor-pointer hover:bg-[#b6b1f1]"
      onClick={() =>
        dispatch({
          type: ACTIONS.CHOOSE_OPERATION,
          payload: { operand: operand },
        })
      }
    >
      {operand}
    </button>
  );
};

export default ButtonOp;
