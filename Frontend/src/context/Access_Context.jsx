import { createContext, useState } from "react";
import { axios_function } from "../utilities/axios";
import { useNavigate } from "react-router-dom";

export const Accesses_Context = createContext();

export const Accesses_Provider = ({ children }) => {
  const [accesses, setAccesses] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    const response = await axios_function(
      "GET",
      "http://localhost/Projects/CSSLTD-GYM/Backend/access/read_user"
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
      setAccesses(response.data);
    }
  };

  const update_accesses = () => {
    getData();
  };

  return (
    <Accesses_Context.Provider value={{ accesses, update_accesses }}>
      {children}
    </Accesses_Context.Provider>
  );
};
