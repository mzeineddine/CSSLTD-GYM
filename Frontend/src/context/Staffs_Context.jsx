import { createContext, useState } from "react";
import { axios_function } from "../utilities/axios";
import { useNavigate } from "react-router-dom";

export const Staffs_Context = createContext();

export const Staffs_Provider = ({ children }) => {
  const [staffs, setStaffs] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    const response = await axios_function(
      "GET",
      "http://localhost/Projects/CSSLTD-GYM/Backend/user/read"
    );
    if (response.message === "Access denied.") {
      navigate("/");
    } else if (response.data) {
      setStaffs(response.data);
    }
  };

  const update_staffs = () => {
    getData();
  };

  return (
    <Staffs_Context.Provider value={{ staffs, update_staffs }}>
      {children}
    </Staffs_Context.Provider>
  );
};
