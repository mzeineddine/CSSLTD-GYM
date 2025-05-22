import { useContext, useEffect, useState } from "react";
import { axios_function } from "../../utilities/axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import MUIDataTable from "mui-datatables";
import "./balance.css";
import { Accesses_Context } from "../../context/Access_Context";

const Balance = () => {
  const { accesses, update_accesses } = useContext(Accesses_Context);
  const [access, setAccess] = useState(null);
  if (!accesses) update_accesses();
  useEffect(() => {
    if (!accesses) return;

    const newAccess = {
      create: false,
      view: false,
      edit: false,
      delete: false,
    };

    accesses.forEach((acc) => {
      if (acc.page === "balance") {
        if (acc.action == "1") newAccess.create = true;
        if (acc.action == "2") newAccess.view = true;
        if (acc.action == "3") newAccess.edit = true;
        if (acc.action == "4") newAccess.delete = true;
      }
    });

    setAccess(newAccess);
  }, [accesses]);

  const [formData, setFormData] = useState({
    from: "",
    to: "",
  });

  const [tableData, setTableData] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);
  const [transactionsHeaders, setTransactionsHeaders] = useState([]);
  const handleShowClick = async () => {
    console.log(formData);
    try {
      const response = await axios_function(
        "POST",
        "http://localhost/Projects/CSSLTD-GYM/Backend/general/balance",
        formData
      );

      // Parse the stringified JSON object
      const rawData = response.data;
      const parsedData =
        typeof rawData === "string" ? JSON.parse(rawData) : rawData;

      if (
        parsedData &&
        typeof parsedData === "object" &&
        !Array.isArray(parsedData)
      ) {
        const dataArray = [parsedData]; // wrap in array for MUIDataTable
        const headers = Object.keys(parsedData);

        setTableHeaders(headers);
        setTableData(dataArray);
      } else {
        setTableHeaders([]);
        setTableData([]);
      }
    } catch (error) {
      console.error("Error fetching balance data:", error);
      setTableHeaders([]);
      setTableData([]);
    }

    try {
      const response = await axios_function(
        "POST",
        "http://localhost/Projects/CSSLTD-GYM/Backend/general/balance_transactions",
        formData
      );

      // Parse the stringified JSON object
      const parsedData = response.data;

      const dataArray = parsedData; // wrap in array for MUIDataTable
      const headers = Object.keys(parsedData[0]);
      console.log(Object.values(dataArray));
      setTransactionsHeaders(headers);
      setTransactionsData(dataArray);
    } catch (error) {
      console.error("Error fetching balance data:", error);
      setTransactionsHeaders([]);
      setTransactionsData([]);
    }

    // console.log(transactionsData)
    // console.log(transactionsHeaders)
  };

  return (
    <div className="balance flex flex-col items-start m-2">
      <div className="balance-form flex flex-row justify-between gap-1">
        <LocalizationProvider
          className="balance flex flex-row gap-1 justify-around w-[50%] m-2"
          dateAdapter={AdapterDayjs}
        >
          <DatePicker
            label="from"
            value={dayjs(formData.from)}
            onChange={(newValue) =>
              setFormData({
                ...formData,
                from: newValue ? dayjs(newValue).format("YYYY-MM-DD") : "",
              })
            }
          />
          <DatePicker
            label="To"
            value={dayjs(formData.to)}
            onChange={(newValue) =>
              setFormData({
                ...formData,
                to: newValue ? dayjs(newValue).format("YYYY-MM-DD") : "",
              })
            }
          />
          <Button
            style={{
              width: "auto",
              padding: "1em 3.5em",
              backgroundColor: "blueviolet",
              color: "white",
            }}
            type="submit"
            onClick={handleShowClick}
          >
            Show
          </Button>
        </LocalizationProvider>
      </div>
      <div className="balance-table mt-4 w-full">
        {access?.view && (
          <MUIDataTable
            title={"Balance"}
            data={tableData}
            columns={tableHeaders}
            options={{
              selectableRows: "none",
              responsive: "standard",
              pagination: false,
              search: false,
              print: false,
              download: false,
              filter: false,
              viewColumns: false,
            }}
          />
        )}
      </div>
      <div className="balance-table mt-4 w-full">
        {access?.view && (
          <MUIDataTable
            title={"Transactions"}
            data={transactionsData}
            columns={transactionsHeaders}
            options={{
              selectableRows: "none",
              responsive: "standard",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Balance;
