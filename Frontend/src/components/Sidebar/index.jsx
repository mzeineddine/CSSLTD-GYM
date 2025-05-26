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

const Sidebar = () => {
  const { generalSettings, update_generalSettings } = useContext(
    GeneralSettings_Context
  );
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
    { path: "balance", text: "Balance", icon: <AccountBalance /> },
    { path: "expense", text: "Expense", icon: <AttachMoney /> },
    { path: "access", text: "Access", icon: <Lock /> },
    { path: "log", text: "Log", icon: <ListAlt /> },
  ];

  const bottomMenuItems = [
    { path: "settings", text: "Settings", icon: <Settings /> },
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
          sx={{ position: "relative", top: 10, left: 5, zIndex: 10 }}
        >
          <Menu />
        </IconButton>
      )}

      <Drawer
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

          {menuItems.map((item) => (
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
          ))}

          <Divider />

          {bottomMenuItems.map((item) => (
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
          ))}

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
