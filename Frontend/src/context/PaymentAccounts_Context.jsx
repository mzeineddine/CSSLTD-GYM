import { createContext, useState } from "react";
import { axios_function } from "../utilities/axios";
import { useNavigate } from "react-router-dom";

export const PaymentAccounts_Context = createContext();

export const PaymentAccounts_Provider = ({ children }) => {
  const [paymentAccounts, setPaymentAccounts] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    const response = await axios_function(
      "GET",
      "http://localhost/Projects/CSSLTD-GYM/Backend/payment_account/read"
    );
    if (response.message === "Access denied.") {
      navigate("/");
    } else if (response.data) {
      setPaymentAccounts(response.data);
    }
  };

  const update_paymentAccounts = () => {
    getData();
  };

  return (
    <PaymentAccounts_Context.Provider value={{ paymentAccounts, update_paymentAccounts }}>
      {children}
    </PaymentAccounts_Context.Provider>
  );
};
