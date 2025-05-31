import { createContext, useState } from "react";
import { axios_function } from "../utilities/axios";
import { useNavigate } from "react-router-dom";

export const Expenses_Context = createContext();

export const Expenses_Provider = ({ children }) => {
  const [expenses, setExpenses] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    const response = await axios_function(
      "GET",
      "http://localhost/Projects/CSSLTD-GYM/Backend/expense/read"
    );
    if (response.result) {
      console.log(response.message);
    } else {
      console.log("ERROR", response.message);
      if (response.message === "Access denied.") {
        navigate("/");
      }
    }
    if (response.data) {
      setExpenses(response.data);
    }
  };

  const update_expenses = () => {
    getData();
  };

  return (
    <Expenses_Context.Provider value={{ expenses, update_expenses }}>
      {children}
    </Expenses_Context.Provider>
  );
};
