import { createContext, useState } from "react";
import { axios_function } from "../utilities/axios";
import { useNavigate } from "react-router-dom";

export const Coaches_Context = createContext();

export const Coaches_Provider = ({ children }) => {
  const [coaches, setCoaches] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    const response = await axios_function(
      "GET",
      "http://localhost/Projects/CSSLTD-GYM/Backend/coach/read"
    );
    if (response.message === "Access denied.") {
      navigate("/");
    } else if (response.data) {
      setCoaches(response.data);
    }
  };

  const update_coaches = () => {
    getData();
  };

  return (
    <Coaches_Context.Provider value={{ coaches, update_coaches }}>
      {children}
    </Coaches_Context.Provider>
  );
};
