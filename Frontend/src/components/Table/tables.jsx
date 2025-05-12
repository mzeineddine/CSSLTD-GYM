import { CacheProvider, ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import MUIDataTable from "mui-datatables";
import createCache from "@emotion/cache";
import { Members_Context } from "../../context/Members_Context.jsx";
import { Staffs_Context } from "../../context/Staffs_Context.jsx";
import { Coaches_Context } from "../../context/Coaches_Context.jsx";
import { Expenses_Context } from "../../context/Expenses_Context.jsx";
import { PaymentAccounts_Context } from "../../context/PaymentAccounts_Context.jsx";
import PositionedMenu from "../Acttion_Menu/index.jsx";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./tables.css";
import Add_Popup from "../Add_Popup/index.jsx";
const Table1 = (props) => {
  const { members, update_members } = useContext(Members_Context);
  const { staffs, update_staffs } = useContext(Staffs_Context);
  const { coaches, update_coaches } = useContext(Coaches_Context);
  const { expenses, update_expenses } = useContext(Expenses_Context);
  const { paymentAccounts, update_paymentAccounts } = useContext(
    PaymentAccounts_Context
  );

  let { title, info, searchable, paging, exportable, visible } = props;
  const [headers, setHeaders] = useState([]);
  const [values, setValues] = useState([]);
  // const [ids, setIds] = useState([]);
  let data = [];
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
    }
    if (!data) {
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
      }
    } else {
      data.forEach((data) => {
        delete data.password;
        delete data.is_deleted;
      });
      if (visible) {
        data = data.slice(0, visible);
      }
      const [_, ...headers_without_id] = [...Object.keys(data[0])];
      // console.log(headers_without_id)
      setHeaders(
        props.options ? [...headers_without_id, "actions"] : headers_without_id
      );
      // const rows = data.map((item, index) => {
      //   const row = Object.values(item);
      //   props.options &&
      //     row.push(
      //       <PositionedMenu data={data[index]} options={props.options} />
      //     );
      //   return row;
      // });
      const rows_without_id = data.map((item) => {
        // const row = Object.values(item);
        const [_, ...row] = [...Object.values(item)];
        props.options &&
          row.push(
            <PositionedMenu
              data={item}
              options_names={props.options_names}
              options_functions_field={props.options_functions_field}
              options={props.options}
            />
          );
        return row;
      });
      setValues(rows_without_id);

      // setIds(
      //   data.map((value) => {
      //     return value["id"];
      //   })
      // );
    }
  }, [members, staffs, coaches, expenses, paymentAccounts]);

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
    selectableRows: "none",
    // onTableChange: (action, state) => {
    //   // console.log(action);
    //   // console.dir(state);
    // },
  };
  return (
    <div className="table w-full rounded-2xl ">
      <CacheProvider value={muiCache}>
        {info && (
          <div className="info flex justify-between rounded-t-2xl items-center bg-gray-50 px-1">
            <p className="h-full inline justify-content-center align-items-center">
              {title}
            </p>
            <div>
              <Link to="appointments">See All</Link>
            </div>
          </div>
        )}
        <ThemeProvider theme={createTheme()}>
          <MUIDataTable
            // title={title}
            data={values}
            columns={[...headers]}
            options={options}
          />
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
};
export default Table1;
