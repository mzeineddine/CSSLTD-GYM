import { createContext, useState } from "react";
import { axios_function } from "../utilities/axios";
import { useNavigate } from "react-router-dom";

export const Subscriptions_Context = createContext();

export const Subscriptions_Provider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState(null);
  const navigate = useNavigate();

  const getData = async (member_id) => {
    const response = await axios_function(
      "POST",
      "http://localhost/Projects/CSSLTD-GYM/Backend/subscription/read",
      {member_id}
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
      setSubscriptions(response.data);
    }
  };

  const update_subscriptions = (member_id) => {
    getData(member_id);
  };

  return (
    <Subscriptions_Context.Provider value={{ subscriptions, update_subscriptions }}>
      {children}
    </Subscriptions_Context.Provider>
  );
};
