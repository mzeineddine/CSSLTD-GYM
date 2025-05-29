import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  useMediaQuery,
  ThemeProvider,
  createTheme,
  Avatar,
  Box,
} from "@mui/material";
import {
  Home,
  Person,
  Groups,
  FitnessCenter,
  Category,
  CalendarMonth,
  AccountBalance,
  AttachMoney,
  Lock,
  ListAlt,
  Settings,
  Logout,
  Menu,
  Image,
} from "@mui/icons-material";
import { GeneralSettings_Context } from "../../context/GeneralSettings_Context";
import { Accesses_Context } from "../../context/Access_Context";

const Sidebar = () => {
  const { generalSettings, update_generalSettings } = useContext(
    GeneralSettings_Context
  );
  const { accesses, update_accesses } = useContext(Accesses_Context);
  const [access, setAccess] = useState(null);
  useEffect(() => {
    if (!accesses) update_accesses();
    if (!accesses) return;

    const newAccess = {
      create_settings: false,
      view_settings: false,
      edit_settings: false,
      delete_settings: false,
      // create_member: false,
      // view_member: false,
      // edit_member: false,
      // delete_member: false,
      // create_member_payment: false,
      // view_member_payment: false,
      // edit_member_payment: false,
      // delete_member_payment: false,
      // create_staff: false,
      // view_staff: false,
      // edit_staff: false,
      // delete_staff: false,
      // create_coach: false,
      // view_coach: false,
      // edit_coach: false,
      // delete_coach: false,
      // create_category: false,
      // view_category: false,
      // edit_category: false,
      // delete_category: false,
      // create_calendar: false,
      // view_calendar: false,
      // edit_calendar: false,
      // delete_calendar: false,
      create_balance: false,
      view_balance: false,
      edit_balance: false,
      delete_balance: false,
      // create_expense: false,
      // view_expense: false,
      // edit_expense: false,
      // delete_expense: false,
      // create_account: false,
      // view_account: false,
      // edit_account: false,
      // delete_account: false,
      // create_account_payment: false,
      // view_account_payment: false,
      // edit_account_payment: false,
      // delete_account_payment: false,
      create_log: false,
      view_log: false,
      edit_log: false,
      delete_log: false,
      create_access: false,
      view_access: false,
      edit_access: false,
      delete_access: false,
    };

    accesses.forEach((acc) => {
      if (acc.page === "settings") {
        if (acc.action == "1") newAccess.create_settings = true;
        if (acc.action == "2") newAccess.view_settings = true;
        if (acc.action == "3") newAccess.edit_settings = true;
        if (acc.action == "4") newAccess.delete_settings = true;
        // } else if (acc.page === "member") {
        //   if (acc.action == "1") newAccess.create_member = true;
        //   if (acc.action == "2") newAccess.view_member = true;
        //   if (acc.action == "3") newAccess.edit_member = true;
        //   if (acc.action == "4") newAccess.delete_member = true;
        // } else if (acc.page === "member_payment") {
        //   if (acc.action == "1") newAccess.create_member_payment = true;
        //   if (acc.action == "2") newAccess.view_member_payment = true;
        //   if (acc.action == "3") newAccess.edit_member_payment = true;
        //   if (acc.action == "4") newAccess.delete_member_payment = true;
        // } else if (acc.page === "staff") {
        //   if (acc.action == "1") newAccess.create_staff = true;
        //   if (acc.action == "2") newAccess.view_staff = true;
        //   if (acc.action == "3") newAccess.edit_staff = true;
        //   if (acc.action == "4") newAccess.delete_staff = true;
        // } else if (acc.page === "coach") {
        //   if (acc.action == "1") newAccess.create_coach = true;
        //   if (acc.action == "2") newAccess.view_coach = true;
        //   if (acc.action == "3") newAccess.edit_coach = true;
        //   if (acc.action == "4") newAccess.delete_coach = true;
        // } else if (acc.page === "category") {
        //   if (acc.action == "1") newAccess.create_category = true;
        //   if (acc.action == "2") newAccess.view_category = true;
        //   if (acc.action == "3") newAccess.edit_category = true;
        //   if (acc.action == "4") newAccess.delete_category = true;
        // } else if (acc.page === "calendar") {
        //   if (acc.action == "1") newAccess.create_calendar = true;
        //   if (acc.action == "2") newAccess.view_calendar = true;
        //   if (acc.action == "3") newAccess.edit_calendar = true;
        //   if (acc.action == "4") newAccess.delete_calendar = true;
      } else if (acc.page === "balance") {
        if (acc.action == "1") newAccess.create_balance = true;
        if (acc.action == "2") newAccess.view_balance = true;
        if (acc.action == "3") newAccess.edit_balance = true;
        if (acc.action == "4") newAccess.delete_balance = true;
        // } else if (acc.page === "expense") {
        //   if (acc.action == "1") newAccess.create_expense = true;
        //   if (acc.action == "2") newAccess.view_expense = true;
        //   if (acc.action == "3") newAccess.edit_expense = true;
        //   if (acc.action == "4") newAccess.delete_expense = true;
        // } else if (acc.page === "account") {
        //   if (acc.action == "1") newAccess.create_account = true;
        //   if (acc.action == "2") newAccess.view_account = true;
        //   if (acc.action == "3") newAccess.edit_account = true;
        //   if (acc.action == "4") newAccess.delete_account = true;
        // } else if (acc.page === "account_payment") {
        //   if (acc.action == "1") newAccess.create_account_payment = true;
        //   if (acc.action == "2") newAccess.view_account_payment = true;
        //   if (acc.action == "3") newAccess.edit_account_payment = true;
        //   if (acc.action == "4") newAccess.delete_account_payment = true;
      } else if (acc.page === "log") {
        if (acc.action == "1") newAccess.create_log = true;
        if (acc.action == "2") newAccess.view_log = true;
        if (acc.action == "3") newAccess.edit_log = true;
        if (acc.action == "4") newAccess.delete_log = true;
      } else if (acc.page === "access") {
        if (acc.action == "1") newAccess.create_access = true;
        if (acc.action == "2") newAccess.view_access = true;
        if (acc.action == "3") newAccess.edit_access = true;
        if (acc.action == "4") newAccess.delete_access = true;
      }
    });

    setAccess(newAccess);
  }, [accesses]);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [open, setOpen] = useState(!isMobile);
  const [logoUrl, setLogoUrl] = useState("#");

  useEffect(() => {
    if (!isMobile) {
      setOpen(false);
    } else {
      setOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (!generalSettings) update_generalSettings();
  }, []);
  useEffect(() => {
    setLogoUrl("http://localhost/Projects/CSSLTD-GYM/" + generalSettings?.logo);
  }, [generalSettings]);

  const menuItems = [
    { path: "member", text: "Member", icon: <Person /> },
    { path: "staff", text: "Staff", icon: <Groups /> },
    { path: "coach", text: "Coach", icon: <FitnessCenter /> },
    { path: "category", text: "Category", icon: <Category /> },
    { path: "calendar", text: "Calendar", icon: <CalendarMonth /> },
    access?.view_balance
      ? {
          path: "balance",
          text: "Balance",
          icon: <AccountBalance />,
        }
      : null,
    { path: "expense", text: "Expense", icon: <AttachMoney /> },
    access?.view_access
      ? {
          path: "access",
          text: "Access",
          icon: <Lock />,
        }
      : null,
    access?.view_log ? { path: "log", text: "Log", icon: <ListAlt /> } : null,
  ];

  const bottomMenuItems = [
    access?.view_settings
      ? {
          path: "settings",
          text: "Settings",
          icon: <Settings />,
        }
      : null,
  ];

  const theme = createTheme({
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: "rgb(250, 250, 250)",
            width: 240,
            transition: "width 0.3s ease",
            height: "100%",
            "&.MuiDrawer-paperAnchorDockedLeft": {
              borderRight: "none",
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {isMobile && (
        <IconButton
          onClick={() => setOpen(!open)}
          sx={{ position: "relative", top: 10, left: 5, zIndex: 1500 }}
        >
          <Menu />
        </IconButton>
      )}
      <Drawer
        // variant={isMobile ? "temporary" : "permanent"}
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={() => setOpen(false)}
        onMouseEnter={!isMobile ? () => setOpen(true) : undefined}
        onMouseLeave={!isMobile ? () => setOpen(false) : undefined}
        sx={{
          width: open ? 240 : 50,
          transition: "width 0.5s ease",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? 240 : 50,
            boxSizing: "border-box",
            transition: "width 0.5s ease",
          },
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/home"
              sx={{
                width: "100%",
                margin: "0px 12px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 32,
                }}
              >
                {/* <Home sx={{ fontSize: 32 }} /> */}
                {/* <Home /> */}
                {generalSettings && (
                  <Avatar
                    component={"image"}
                    src={logoUrl}
                    alt="Logo Preview"
                    sx={{ width: 32, height: 32 }}
                  />
                )}
              </ListItemIcon>
              {/* <ListItemText
                primary="GYM System"
                sx={{ display: open ? "auto" : "none", margin: "0px 5px" }}
              /> */}
            </ListItemButton>
          </ListItem>

          {menuItems.map(
            (item) =>
              item && (
                <ListItem key={item.path} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    sx={{
                      color: "blueviolet",
                      ":hover": {
                        backgroundColor: "blueviolet",
                        color: "white",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: "inherit", minWidth: 32 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{
                        color: "inherit",
                        display: open ? "auto" : "none",
                        margin: "0px 5px",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              )
          )}

          <Divider />

          {bottomMenuItems.map(
            (item) =>
              item && (
                <ListItem key={item?.path} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item?.path}
                    sx={{
                      color: "blueviolet",
                      ":hover": {
                        backgroundColor: "blueviolet",
                        color: "white",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: "inherit",
                        minWidth: 32,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{
                        color: "inherit",
                        display: open ? "auto" : "none",
                        margin: "0px 5px",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              )
          )}

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                localStorage.removeItem("access-token");
                navigate("/");
              }}
              sx={{
                color: "blueviolet",
                ":hover": {
                  backgroundColor: "blueviolet",
                  color: "white",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "inherit",
                  minWidth: 32,
                }}
              >
                <Logout />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                sx={{
                  color: "inherit",
                  display: open ? "auto" : "none",
                  margin: "0px 5px",
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </ThemeProvider>
  );
};

export default Sidebar;
