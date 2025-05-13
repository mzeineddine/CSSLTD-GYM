import { Link, useNavigate } from "react-router-dom";
import member_icon from "../../assets/icons/member_icon.svg"
import staff_icon from "../../assets/icons/staff_icon.svg"
import coach_icon from "../../assets/icons/staff_icon.svg"
import calendar_icon from "../../assets/icons/calendar_icon.svg"
import balance_icon from "../../assets/icons/balance_icon.svg"
import expense_icon from "../../assets/icons/expense_icon.svg"
import logo_icon from "../../assets/icons/logo_icon.svg"
import setting_icon from "../../assets/icons/setting_icon.svg"
import logout_icon from "../../assets/icons/logout_icon.svg"
import "./sidebar.css" 
const Sidebar = () => {
    const navigate = useNavigate()
    const handleMouseEnter = () => {
        // console.log("mouse enter")
        const sidebar = document.querySelector(".sideBar");
        // console.log(sidebar)
        const texts = document.querySelectorAll("a .text");
        sidebar.classList.remove("shorten")
        texts.forEach(text => {
            text.classList.remove("hidden")
        });
        const div_texts = document.querySelectorAll(".a .text");
        sidebar.classList.remove("shorten")
        div_texts.forEach(text => {
            text.classList.remove("hidden")
        });
    }
    const handleMouseLeave = () => {
        // console.log("mouse leave")
        const sidebar = document.querySelector(".sideBar");
        // console.log(sidebar)
        const texts = document.querySelectorAll("a .text");
        sidebar.classList.add("shorten")
        texts.forEach(text => {
            text.classList.add("hidden")
        });
        const div_texts = document.querySelectorAll(".a .text");
        sidebar.classList.add("shorten")
        div_texts.forEach(text => {
            text.classList.add("hidden")
        });
    }
    return(
        <>
            <div className="sideBar shorten" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <Link to="/home" className="logo">  <span className="logo-img"><img className="logo-img" src={logo_icon} alt="logo" /></span><span className="text hidden"></span></Link>
                <Link to="member">   <span className="icon"><img className="icon-img" src={member_icon} alt="member" /></span>      <span className="text hidden">Member</span></Link>
                <Link to="staff">   <span className="icon"><img className="icon-img" src={staff_icon} alt="staff" /></span>      <span className="text hidden">Staff</span></Link>
                <Link to="coach">   <span className="icon"><img className="icon-img" src={coach_icon} alt="coach" /></span>      <span className="text hidden">Coach</span></Link>
                <Link to="category">   <span className="icon"><img className="icon-img" src={coach_icon} alt="category" /></span>      <span className="text hidden">Category</span></Link>
                <Link to="calendar"><span className="icon"><img className="icon-img" src={calendar_icon} alt="calendar" /></span><span className="text hidden">Calendar</span></Link>
                <Link to="balance"> <span className="icon"><img className="icon-img" src={balance_icon} alt="balance" /></span>  <span className="text hidden">Balance</span></Link>
                <Link to="expense"> <span className="icon"><img className="icon-img" src={expense_icon} alt="expense" /></span>  <span className="text hidden">Expense</span></Link>
                <hr/>
                <Link to="settings"> <span className="icon"><img className="icon-img" src={setting_icon} alt="settings" /></span>  <span className="text hidden">Settings</span></Link>
                <div className="a" onClick={()=>{
                    console.log("logout")
                    localStorage.removeItem("access-token")
                    navigate("/")
                }}> <span className="icon"><img className="icon-img" src={logout_icon} alt="logout" /></span>  <span className="text hidden">Logout</span></div>
            </div>
        </>
    );
}
export default Sidebar;