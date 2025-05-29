import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import Add_Popup from "../Add_Popup";
import Edit_Popup from "../Edit_Popup";
import { useNavigate } from "react-router-dom";

export default function PositionedMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [function_name, setFunction_name] = useState({
    name: "text",
  });
  const add_payment = (function_name) => {
    setFunction_name(function_name);
    setShowAdd(true);
  };
  const add_popup_field = () => {
    return props.options_functions_field[function_name];
  };
  const add_popup_name = () => {
    return props.options_names[function_name];
  };

  const edit_account = (function_name) => {
    setFunction_name(function_name);
    setShowEdit(true);
  };
  const edit_popup_field = () => {
    return props.options_functions_field[function_name];
  };
  const edit_popup_name = () => {
    return props.options_names[function_name];
  };

  const view_payment = () => {
    if (props.options_names["view_payment"] == "subscription_payment") {
      navigate("/subscription_payments", { state: props.data });
    } else {
      navigate("/expense_payments", { state: props.data });
    }
  };

  const edit_payment = (function_name) => {
    setFunction_name(function_name);
    setShowEdit(true);
  };

  const edit_category = (function_name) => {
    setFunction_name(function_name);
    setShowEdit(true);
  };

  const edit_member = (function_name) => {
    setFunction_name(function_name);
    setShowEdit(true);
  };

  const edit_expense = (function_name) => {
    setFunction_name(function_name);
    setShowEdit(true);
  };
  return (
    <div>
      {showAdd && (
        <Add_Popup
          open={showAdd}
          onClose={() => setShowAdd(false)}
          options={props.options}
          fields={add_popup_field()}
          name={add_popup_name()}
          filled_field={{ account_id: props.data.id, member_id: props.data.id }}
        />
      )}
      {showEdit && (
        <Edit_Popup
          open={showEdit}
          onClose={() => setShowEdit(false)}
          options={props.select_options}
          fields={edit_popup_field()}
          name={edit_popup_name()}
          filled_field={props.data}
        />
      )}
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {props.options.map((value, index) => {
          const function_name = props.options[index][Object.keys(value)[0]];
          return (
            value && (
              <MenuItem
                key={index}
                onClick={() => eval(function_name)(function_name)}
              >
                {Object.keys(value)[0]}
              </MenuItem>
            )
          );
        })}
      </Menu>
    </div>
  );
}
