import { createContext, useState } from "react";
import { axios_function } from "../utilities/axios";
import { useNavigate } from "react-router-dom";

export const Appointments_Context = createContext();

export const Appointments_Provider = ({ children }) => {
  const [appointments, setAppointments] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const response = await axios_function(
      "GET",
      "http://localhost/Projects/CSSLTD-GYM/Backend/appointment/read"
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
      setAppointments(response.data);
    }
    setLoading(false);
  };

  const update_appointments = () => {
    getData();
  };

  return (
    <Appointments_Context.Provider
      value={{ appointments, update_appointments }}
    >
      {children}
    </Appointments_Context.Provider>
  );
};
