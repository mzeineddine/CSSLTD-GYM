import { createContext, useState } from "react";
import { axios_function } from "../utilities/axios";
import { useNavigate } from "react-router-dom";

export const GeneralSettings_Context = createContext();

export const GeneralSettings_Provider = ({ children }) => {
  const [generalSettings, setGeneralSettings] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    const response = await axios_function(
      "POST",
      "http://localhost/Projects/CSSLTD-GYM/Backend/global_setting/read",
      { id: 1 }
    );
    if (response.message === "Access denied.") {
      navigate("/");
    } else if (response.data) {
      setGeneralSettings(response.data);
    }
  };

  const update_generalSettings = () => {
    getData();
  };

  return (
    <GeneralSettings_Context.Provider
      value={{ generalSettings, update_generalSettings }}
    >
      {children}
    </GeneralSettings_Context.Provider>
  );
};
