import { createContext, useState } from "react";
import { axios_function } from "../utilities/axios";
import { useNavigate } from "react-router-dom";

export const Members_Context = createContext();

export const Members_Provider = ({ children }) => {
  const [members, setMembers] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    const response = await axios_function(
      "GET",
      "http://localhost/Projects/CSSLTD-GYM/Backend/member/read"
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
      // console.log(response.data);
      setMembers(response.data);
    }
  };

  const update_members = () => {
    getData();
  };

  return (
    <Members_Context.Provider value={{ members, update_members }}>
      {children}
    </Members_Context.Provider>
  );
};
