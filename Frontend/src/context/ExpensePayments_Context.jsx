import { createContext, useState } from "react";
import { axios_function } from "../utilities/axios";
import { useNavigate } from "react-router-dom";

export const ExpensePayments_Context = createContext();

export const ExpensePayments_Provider = ({ children }) => {
  const [expensePayments, setExpensePayments] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    const response = await axios_function(
      "GET",
      "http://localhost/Projects/CSSLTD-GYM/Backend/expense_payment/read"
    );
    if (response.message === "Access denied.") {
      navigate("/");
    } else if (response.data) {
      setExpensePayments(response.data);
    }
  };

  const update_expensePayments = () => {
    getData();
  };

  return (
    <ExpensePayments_Context.Provider value={{ expensePayments, update_expensePayments }}>
      {children}
    </ExpensePayments_Context.Provider>
  );
};
