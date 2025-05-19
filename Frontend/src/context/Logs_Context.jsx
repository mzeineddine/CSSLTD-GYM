import { createContext, useState } from "react";
import { axios_function } from "../utilities/axios";
import { useNavigate } from "react-router-dom";

export const Logs_Context = createContext();

export const Logs_Provider = ({ children }) => {
  const [logs, setLogs] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    const response = await axios_function(
      "GET",
      "http://localhost/Projects/CSSLTD-GYM/Backend/log/read"
    );
    if (response.message === "Access denied.") {
      navigate("/");
    } else if (response.data) {
      setLogs(response.data);
    }
  };

  const update_logs = () => {
    getData();
  };

  return (
    <Logs_Context.Provider value={{ logs, update_logs }}>
      {children}
    </Logs_Context.Provider>
  );
};
