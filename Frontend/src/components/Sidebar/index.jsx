import { useState, useEffect } from "react";
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
  createTheme
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
  Menu
} from "@mui/icons-material";

const Sidebar = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [open, setOpen] = useState(!isMobile);
  
  // Handle responsive behavior
  useEffect(() => {
    if (!isMobile) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isMobile]);

  const menuItems = [
    { path: "/home", text: "Home", icon: <Home /> },
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
              borderRight: "none"
            }
          }
        }
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      {isMobile && (
        <IconButton
          onClick={() => setOpen(!open)}
          sx={{ position: 'absolute', top: 10, left: 10, zIndex: 1300 }}
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
          width: open ? 240 : 56,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? 240 : 56,
            boxSizing: "border-box",
            transition: "width 0.3s ease"
          }
        }}
      >
        <List>
          <ListItem disablePadding >
            <ListItemButton component={Link} to="/home">
              <ListItemIcon sx={{ minWidth: 46 }}>
                <Home sx={{ fontSize: 32 }} />
              </ListItemIcon>
              <ListItemText primary="GYM System" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          {menuItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton component={Link} to={item.path}>
                <ListItemIcon sx={{ minWidth: 46 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}

          <Divider />

          {bottomMenuItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton component={Link} to={item.path}>
                <ListItemIcon sx={{ minWidth: 46 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => {
                localStorage.removeItem("access-token");
                navigate("/");
              }}
            >
              <ListItemIcon sx={{ minWidth: 46 }}><Logout /></ListItemIcon>
              <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </ThemeProvider>
  );
};

export default Sidebar;
{/* <div className="a" onClick={()=>{
    localStorage.removeItem("access-token")
    navigate("/")
}}> <span className="icon"><img className="icon-img" src={logout_icon} alt="logout" /></span>  <span className="text hidden">Logout</span></div> */}