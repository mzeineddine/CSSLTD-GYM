import { CacheProvider, ThemeProvider } from "@emotion/react";
import { Box, createTheme } from "@mui/material";
import MUIDataTable from "mui-datatables";
import createCache from "@emotion/cache";
import { Members_Context } from "../../context/Members_Context.jsx";
import { Staffs_Context } from "../../context/Staffs_Context.jsx";
import { Coaches_Context } from "../../context/Coaches_Context.jsx";
import { Expenses_Context } from "../../context/Expenses_Context.jsx";
import { PaymentAccounts_Context } from "../../context/PaymentAccounts_Context.jsx";
import PositionedMenu from "../Acttion_Menu/index.jsx";
import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./tables.css";
import Add_Popup from "../Add_Popup/index.jsx";
import { ExpensePayments_Context } from "../../context/ExpensePayments_Context.jsx";
import { Categories_Context } from "../../context/Categories_Context.jsx";
import { SubscriptionPayments_Context } from "../../context/SubscriptionPayments_Context.jsx";
import { Logs_Context } from "../../context/Logs_Context.jsx";
import { axios_function } from "../../utilities/axios.js";
import SnackBar from "../Snackbar/index.jsx";
import { Subscriptions_Context } from "../../context/Subscriptions_Context.jsx";
const Table1 = (props) => {
  const { members, update_members } = useContext(Members_Context);
  const { staffs, update_staffs } = useContext(Staffs_Context);
  const { coaches, update_coaches } = useContext(Coaches_Context);
  const { categories, update_categories } = useContext(Categories_Context);
  const { expenses, update_expenses } = useContext(Expenses_Context);
  const { subscriptions, update_subscriptions } = useContext(Subscriptions_Context);
  const { expensePayments, update_expensePayments } = useContext(
    ExpensePayments_Context
  );
  const { subscriptionPayments, update_subscriptionPayments } = useContext(
    SubscriptionPayments_Context
  );
  const { paymentAccounts, update_paymentAccounts } = useContext(
    PaymentAccounts_Context
  );
  const { logs, update_logs } = useContext(Logs_Context);
  const [message, setMessage] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [success, setSuccess] = useState(false);
  let { title, searchable, paging, exportable, visible } = props;
  const [headers, setHeaders] = useState([]);
  const [values, setValues] = useState([]);
  const [ids, setIds] = useState([]);
  const [status, setStatus] = useState([]);
  const [access_level, setAccessLevels] = useState([]);
  const [counter, setCounter] = useState(0);

  let data = null;
  const handleDelete = (rows_deleted) => {
    // rows_deleted.preventDefaults();
    event.preventDefault();
    const deleted_indexes = rows_deleted.data.map((d) => d.dataIndex);
    const deleted_rows_ids = deleted_indexes.map((index) => ids[index]);
    console.log("Deleted rows:", deleted_rows_ids);
    deleted_rows_ids.forEach(async (id) => {
      let url_title = title;
      if (title == "subscriptionPayments") url_title = "subscription_payment";
      else if (title == "expensePayments") url_title = "expense_payment";
      else if (title == "paymentAccounts") url_title = "payment_account";
      else if (title == "willing to end") url_title = "subscription";

      if (title == "staff") url_title = "user";
      console.log("ID: " + id, "URL: " + url_title);
      const response = await axios_function(
        "Delete",
        "http://localhost/Projects/CSSLTD-GYM/Backend/" + url_title + "/delete",
        { id: id }
      );
      if (response.result) {
        // console.log(response.message);
        setMessage(response.message);
        setOpenSnack(true);
        setSuccess(true);
        // setUpdate((pre)=>{!pre});
        if (title == "member") {
          update_members();
        } else if (title == "staff") {
          update_staffs();
        } else if (title == "coach") {
          update_coaches();
        } else if (title == "expense") {
          update_expenses();
        } else if (title == "paymentAccounts") {
          update_paymentAccounts();
        } else if (title == "expensePayments") {
          update_expensePayments();
        } else if (title == "categories") {
          update_categories();
        } else if (title == "subscriptionPayments") {
          data = subscriptionPayments;
        } else if (title == "log") {
          update_logs();
        } else if (title == "subscription") {
          update_subscriptions(props?.member_id);
          update_members();
        }
      } else {
        // console.log("ERROR");
        setMessage(response.message);
        setOpenSnack(true);
        setSuccess(false);
      }
    });
  };
  useEffect(() => {
    if (title == "member") {
      data = members;
    } else if (title == "staff") {
      data = staffs;
    } else if (title == "coach") {
      data = coaches;
    } else if (title == "expense") {
      data = expenses;
    } else if (title == "paymentAccounts") {
      data = paymentAccounts;
    } else if (title == "expensePayments") {
      data = expensePayments;
    } else if (title == "categories") {
      data = categories;
    } else if (title == "subscriptionPayments") {
      data = subscriptionPayments;
    } else if (title == "log") {
      data = logs;
    } else if (title == "subscription") {
      data = subscriptions;
      if(counter == 0){
        update_subscriptions(props?.member_id)
        setCounter(counter+1)
      }
      console.log("DATA:", data);
    }
    if (!data || data.length == 0) {
      if (title == "member") {
        update_members();
      } else if (title == "staff") {
        update_staffs();
      } else if (title == "coach") {
        update_coaches();
      } else if (title == "expense") {
        update_expenses();
      } else if (title == "paymentAccounts") {
        update_paymentAccounts();
      } else if (title == "expensePayments") {
        update_expensePayments();
      } else if (title == "categories") {
        update_categories();
      } else if (title == "subscriptionPayments") {
        update_subscriptionPayments();
      } else if (title == "log") {
        update_logs();
      } else if (title == "subscription") {
        update_subscriptions(props?.member_id);
          update_members();

      }
    } else {
      data?.forEach((data) => {
        delete data.password;
        delete data.is_deleted;
      });
      if (visible) {
        data = data.slice(0, visible);
      }
      if (props.data_filter) {
        data = data.filter((value) => {
          if (
            value[Object.keys(props.data_filter)[0]] ==
            props.data_filter[Object.keys(props.data_filter)[0]]
          ) {
            console.log("VALUE", value);
            delete value["member_id"];
            delete value["account_id"];
            return value;
          }
        });
      }
      console.log("data: ", data);
      const [_, ...headers_without_id] = [
        ...Object.keys(data.length > 0 ? data[0] : ""),
      ];
      setHeaders(
        props.options && data.length > 0
          ? [...headers_without_id, "actions"]
          : headers_without_id
      );
      const rows_without_id = data.map((item) => {
        if (title == "staff") {
          let { status } = { ...item };
          let { access_level } = { ...item };
          if (!isNaN(access_level)) {
            switch (access_level) {
              case 1:
                access_level = "Admin";
                break;
              case 2:
                access_level = "User";
                break;
              case 3:
                access_level = "Supervisor";
                break;
              case 4:
                access_level = "Manager";
                break;
              case 5:
                access_level = "Auditor";
                break;
              default:
                access_level = "Undefined";
            }
          }
          if (!isNaN(status)) {
            switch (status) {
              case 0:
                status = "active";
                break;
              case 1:
                status = "inactive";
                break;
              default:
                status = "Undefined";
                break;
            }
          }
          item.status = status;
          item.access_level = access_level;

          // console.log(item.status)
        }

        if (title == "categories") {
          let { type } = { ...item };
          if (!isNaN(type)) {
            switch (type) {
              case 0:
                type = "Month";
                break;
              case 1:
                type = "Class";
                break;
              default:
                type = "Undefined";
            }
          }
          item.type = type;

          // console.log(item.status)
        }

        const [_, ...row] = [...Object.values(item)];

        props.options &&
          row.push(
            <PositionedMenu
              data={{ ...item, member_id: props?.member_id }}
              options_names={props.options_names}
              select_options={props.select_options}
              options_functions_field={props.options_functions_field}
              options={props.options}
            />
          );
        return row;
      });
      setValues(rows_without_id);

      const rows_id = data.map((item) => {
        const { id } = { ...item };
        return id;
      });
      setIds(rows_id);

      if (title == "staff") {
        const rows_status = data.map((item) => {
          const { status } = { ...item };
          const { id } = { ...item };
          return { [id]: status };
        });
        setStatus(rows_status);

        const rows_access_level = data.map((item) => {
          const { access_level } = { ...item };
          const { id } = { ...item };
          return { [id]: access_level };
        });
        setAccessLevels(rows_access_level);
      }
    }
  }, [
    members,
    staffs,
    coaches,
    expenses,
    paymentAccounts,
    expensePayments,
    categories,
    subscriptionPayments,
    logs,
    subscriptions,
  ]);

  const muiCache = createCache({
    key: "mui-datatables",
    prepend: true,
  });
  const options = {
    search: searchable,
    download: exportable,
    print: exportable,
    viewColumns: true,
    filter: true,
    filterType: "search",
    tableBodyHeight: true,
    tableBodyMaxHeight: true,
    pagination: paging,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15, 20],
    selectableRows: props.selectable ? props.selectable : "none",
    selectableRowsOnClick: true,
    responsive: "standard",
    onRowsDelete: handleDelete,
  };
  return (
    <div className="table-container w-[100%] overflow-x-auto">
      <CacheProvider value={muiCache}>
        <ThemeProvider
          theme={createTheme({
            components: {
              MuiTableCell: {
                styleOverrides: {
                  root: {
                    fontSize: "0.8em",
                  },
                },
              },
            },
          })}
        >
          <Box sx={{ minWidth: 800 }}>
            <MUIDataTable
              data={values}
              columns={headers.map((value) => {
                return value.split("_").join(" ");
              })}
              options={options}
            />
          </Box>
        </ThemeProvider>
      </CacheProvider>
      <SnackBar
        success={success}
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
        message={message}
      />
    </div>
  );
};
export default Table1;
