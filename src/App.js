import { useReducer } from "react";
import "./index.css";
import ButtonDigit from "./ButtonDigit";
import ButtonOp from "./ButtonOp";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVAL: "evaluate",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return { ...state, currOperand: payload.digit, overwrite: false };
      }
      if (state.currOperand == null && payload.digit === "0") return state;
      if (payload.digit === "0" && state.currOperand === "0") return state;
      if (payload.digit === "." && state.currOperand == null) {
        return state;
      }
      if (payload.digit === "." && state.currOperand.includes("."))
        return state;

      return {
        ...state,
        currOperand: `${state.currOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currOperand == null && state.prevOperand == null) {
        return state;
      }
      if (state.currOperand == null)
        return { ...state, operand: payload.operand };
      if (state.prevOperand == null) {
        return {
          ...state,
          operand: payload.operand,
          prevOperand: state.currOperand,
          currOperand: null,
        };
      }
      return {
        ...state,
        prevOperand: evaluate(state),
        currOperand: null,
        operand: payload.operand,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.DELETE_DIGIT:
      if (state.currOperand == null) return state;
      if (state.currOperand.length === 1) {
        return {
          ...state,
          currOperand: null,
        };
      }
      return { ...state, currOperand: state.currOperand.slice(0, -1) };
    case ACTIONS.EVAL:
      if (
        state.operand == null ||
        state.currOperand == null ||
        state.prevOperand == null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        prevOperand: null,
        currOperand: evaluate(state),
        operand: null,
      };
  }
};

const evaluate = ({ prevOperand, currOperand, operand }) => {
  const prev = parseFloat(prevOperand);
  const curr = parseFloat(currOperand);
  let result = "";
  switch (operand) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "/":
      result = prev / curr;
      break;
    case "*":
      result = prev * curr;
      break;
  }
  return result.toString();
};

function App() {
  const [{ currOperand, prevOperand, operand }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="w-full border-box p-6 bg-[#1F1B4B] h-screen flex justify-center items-center">
      <div className="w-auto h-auto bg-[#8F64FC]  mx-6 flex flex-col  items-center">
        {/* Output */}
        <div className="bg-black/80 w-full h-[6rem] flex flex-col items-end justify-center text-white text-2xl gap-2 border-2 border-[#8F64FC]">
          {/* prev oper */}
          <div className="text-xl text-gray-500">
            {prevOperand} {operand}
          </div>
          {/* curr oper */}
          <div>{currOperand}</div>
        </div>
        <div className="grid grid-cols-4 ">
          <button
            className="col-span-2 border-2 border-[#1f1b4b] p-8 rounded-sm outline-none cursor-pointer hover:bg-[#b6b1f1]"
            onClick={() => dispatch({ type: ACTIONS.CLEAR })}
          >
            AC
          </button>
          <button
            className="border-2 border-[#1f1b4b] p-8 rounded-sm outline-none cursor-pointer hover:bg-[#b6b1f1]"
            onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
          >
            DEL
          </button>
          <ButtonOp operand={"/"} dispatch={dispatch} />
          <ButtonDigit digit={"7"} dispatch={dispatch} />
          <ButtonDigit digit={"8"} dispatch={dispatch} />
          <ButtonDigit digit={"9"} dispatch={dispatch} />
          <ButtonOp operand={"*"} dispatch={dispatch} />
          <ButtonDigit digit={"4"} dispatch={dispatch} />
          <ButtonDigit digit={"5"} dispatch={dispatch} />
          <ButtonDigit digit={"6"} dispatch={dispatch} />
          <ButtonOp operand={"+"} dispatch={dispatch} />
          <ButtonDigit digit={"1"} dispatch={dispatch} />
          <ButtonDigit digit={"2"} dispatch={dispatch} />
          <ButtonDigit digit={"3"} dispatch={dispatch} />
          <ButtonOp operand={"-"} dispatch={dispatch} />
          <ButtonDigit digit={"."} dispatch={dispatch} />
          <ButtonDigit digit={"0"} dispatch={dispatch} />
          <button
            onClick={() => dispatch({ type: ACTIONS.EVAL })}
            className="col-span-2 border-2 border-[#1f1b4b] p-8 rounded-sm outline-none cursor-pointer hover:bg-[#b6b1f1]"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
