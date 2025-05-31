import { createContext, useState } from "react";
import { axios_function } from "../utilities/axios";
import { useNavigate } from "react-router-dom";

export const SubscriptionPayments_Context = createContext();

export const SubscriptionPayment_Provider = ({ children }) => {
  const [subscriptionPayments, setSubscriptionPayments] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    const response = await axios_function(
      "GET",
      "http://localhost/Projects/CSSLTD-GYM/Backend/subscription_payment/read"
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
      setSubscriptionPayments(response.data);
    }
  };

  const update_subscriptionPayments = () => {
    getData();
  };

  return (
    <SubscriptionPayments_Context.Provider
      value={{ subscriptionPayments, update_subscriptionPayments }}
    >
      {children}
    </SubscriptionPayments_Context.Provider>
  );
};
