import { useContext, useEffect, useMemo, useState } from "react";
import { Staffs_Context } from "../../context/Staffs_Context";
import {
  Autocomplete,
  Button,
  Checkbox,
  createTheme,
  TextField,
  ThemeProvider,
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import { axios_function } from "../../utilities/axios";
import { Accesses_Context } from "../../context/Access_Context";
import { useNavigate } from "react-router-dom";
const Access = () => {
  const navigate = useNavigate()
  const { staffs, update_staffs } = useContext(Staffs_Context);
  const [staff_id, setStaffId] = useState(null);
  const [permissions, setPermissions] = useState([]);
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
      if (acc.page === "access") {
        if (acc.action == "1") newAccess.create = true;
        if (acc.action == "2") newAccess.view = true;
        if (acc.action == "3") newAccess.edit = true;
        if (acc.action == "4") newAccess.delete = true;
      }
    });

    setAccess(newAccess);
  }, [accesses]);
  const get_data = async () => {
    if (staff_id) {
      const response = await axios_function(
        "POST",
        "http://localhost/Projects/CSSLTD-GYM/Backend/access/read",
        { user_id: staff_id }
      );
      if (response.result) {
      console.log(response.message);
    } else {
      console.log("ERROR", response.message);
      if (response.message === "Access denied.") {
        navigate("/");
      }
    }
      // Parse action values to integers
      const parsedPermissions = response?.data?.map((perm) => ({
        ...perm,
        action: parseInt(perm.action),
      }));
      setPermissions(parsedPermissions || []);
    }
  };

  useEffect(() => {
    if (!staffs) update_staffs();
  }, []);

  useEffect(() => {
    if (staff_id) get_data();
  }, [staff_id]);

  const pages = [
    "member",
    "member_payment",
    "staff",
    "coach",
    "category",
    "calendar",
    "balance",
    "expense",
    "account",
    "account_payment",
    "log",
    "access",
    "settings",
  ];
  const actions = ["Create", "View", "Edit", "Delete"];
  const actions_representation = [1, 2, 3, 4];

  const hasPermission = (page, action) =>
    permissions.some((perm) => perm.page === page && perm.action === action);

  const togglePermission = (page, action) => {
    const key = { page, action };
    setPermissions((prev) => {
      const exists = prev.some(
        (perm) => perm.page === key.page && perm.action === key.action
      );
      return exists
        ? prev.filter(
            (perm) => !(perm.page === key.page && perm.action === key.action)
          )
        : [...prev, key];
    });
  };

  const tableData = useMemo(() => {
    return pages.map((page) => {
      const row = { Page: page };
      actions_representation.forEach((action) => {
        row[actions[action - 1]] = (
          <Checkbox
            checked={hasPermission(page, action)}
            onClick={() => togglePermission(page, action)}
            disabled={!(access?.create && access?.edit && access?.delete)}
          />
        );
      });
      return row;
    });
  }, [permissions]);

  const options = {
    download: false,
    print: false,
    pagination: false,
    selectableRows: "none",
  };

  return (
    <div className="access flex flex-col h-full p-[2em] gap-3">
      <Autocomplete
        disablePortal
        options={staffs || []}
        getOptionLabel={(staff) => staff.username || ""}
        onChange={(event, staff) => {
          setPermissions([]);
          setStaffId(staff?.id || null);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Staff" fullWidth />
        )}
      />
      <div className="table w-[100%] rounded-2xl overflow-hidden">
        {staff_id && (
          <ThemeProvider theme={createTheme()}>
            <MUIDataTable
              title="Page Permissions"
              columns={["Page", ...actions]}
              data={tableData}
              options={options}
            />
          </ThemeProvider>
        )}
      </div>
      {staff_id && (
        <Button
          onClick={async () => {
            let response = await axios_function(
              "POST",
              "http://localhost/Projects/CSSLTD-GYM/Backend/access/create_permission",
              { accesses: permissions, user_id: staff_id }
            );
            update_accesses();
          }}
        >
          SAVE
        </Button>
      )}
    </div>
  );
};

export default Access;
