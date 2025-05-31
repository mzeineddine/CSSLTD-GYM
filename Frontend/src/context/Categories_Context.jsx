import { createContext, useState } from "react";
import { axios_function } from "../utilities/axios";
import { useNavigate } from "react-router-dom";

export const Categories_Context = createContext();

export const Categories_Provider = ({ children }) => {
  const [categories, setCategories] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    const response = await axios_function(
      "GET",
      "http://localhost/Projects/CSSLTD-GYM/Backend/category/read"
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
      setCategories(response.data);
    }
  };

  const update_categories = () => {
    getData();
  };

  return (
    <Categories_Context.Provider value={{ categories, update_categories }}>
      {children}
    </Categories_Context.Provider>
  );
};
