import React, { useContext, useEffect, useState } from "react";
import { axios_function } from "../../utilities/axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import MUIDataTable from "mui-datatables";
import "./balance.css";
import { Accesses_Context } from "../../context/Access_Context";
import SnackBar from "../../components/Snackbar";

const Balance = () => {
  const { accesses, update_accesses } = useContext(Accesses_Context);
  const [access, setAccess] = useState(null);

  const [formData, setFormData] = useState({
    from: null,
    to: null,
  });

  const [tableData, setTableData] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);
  const [transactionsHeaders, setTransactionsHeaders] = useState([]);
  const [message, setMessage] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (!accesses) update_accesses();
    if (!accesses) return;

    const newAccess = {
      create: false,
      view: false,
      edit: false,
      delete: false,
    };

    accesses.forEach((acc) => {
      if (acc.page === "balance") {
        if (acc.action === "1") newAccess.create = true;
        if (acc.action === "2") newAccess.view = true;
        if (acc.action === "3") newAccess.edit = true;
        if (acc.action === "4") newAccess.delete = true;
      }
    });

    setAccess(newAccess);
  }, [accesses]);

  const handleShowClick = async () => {
    const requestPayload = {
      from: formData.from ? dayjs(formData.from).format("YYYY-MM-DD") : "",
      to: formData.to ? dayjs(formData.to).format("YYYY-MM-DD") : "",
    };

    try {
      const res1 = await axios_function(
        "POST",
        "http://localhost/Projects/CSSLTD-GYM/Backend/general/balance",
        requestPayload
      );
      if (res1.result) {
        // console.log(response.message);
        setMessage(res1.message);
        setOpenSnack(true);
        setSuccess(true);
      } else {
        // console.log("ERROR");
        setMessage(res1.message);
        setOpenSnack(true);
        setSuccess(false);
      }
      const balanceData =
        typeof res1.data === "string" ? JSON.parse(res1.data) : res1.data;

      if (
        balanceData &&
        typeof balanceData === "object" &&
        !Array.isArray(balanceData)
      ) {
        setTableHeaders(Object.keys(balanceData));
        setTableData([balanceData]);
      } else {
        setTableHeaders([]);
        setTableData([]);
      }
    } catch (err) {
      console.error("Error fetching balance:", err);
      setTableHeaders([]);
      setTableData([]);
    }

    try {
      const res2 = await axios_function(
        "POST",
        "http://localhost/Projects/CSSLTD-GYM/Backend/general/balance_transactions",
        requestPayload
      );
      if (res2.result) {
        // console.log(response.message);
        setMessage(res2.message);
        setOpenSnack(true);
        setSuccess(true);
      } else {
        // console.log("ERROR");
        setMessage(res2.message);
        setOpenSnack(true);
        setSuccess(false);
      }
      const txData = res2.data;
      setTransactionsHeaders(Object.keys(txData[0] || {}));
      setTransactionsData(txData || []);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setTransactionsHeaders([]);
      setTransactionsData([]);
    }
  };

  return (
    <div className="balance flex flex-col items-start m-2">
      <div className="balance-form flex flex-row justify-between gap-1">
        <LocalizationProvider
          className="balance flex flex-row gap-1 justify-around w-[50%] m-2"
          dateAdapter={AdapterDayjs}
        >
          <DatePicker
            label="From"
            value={formData.from}
            onChange={(value) => setFormData({ ...formData, from: value })}
            slotProps={{ textField: { error: false } }}
          />
          <DatePicker
            label="To"
            value={formData.to}
            onChange={(value) => setFormData({ ...formData, to: value })}
            slotProps={{ textField: { error: false } }}
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
      <SnackBar
        success={success}
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
        message={message}
      />
    </div>
  );
};

export default Balance;
