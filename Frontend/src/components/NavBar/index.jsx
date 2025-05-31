import profile_icon from "../../assets/icons/profile_icon.svg"
import "./navBar.css"
import { Members_Context } from "../../context/Members_Context";
import Search_Member from "../Search_Member";
const NavBar = () => {
    const name = localStorage.getItem("user_name");
    return(
        <>
            <div className="navBar">
                <p>Hello, {name}</p>
                <div className="search">
                    <Search_Member/>
                </div>
                {/* <div className="country"></div>
                <div className="notification"></div> */}
                <div className="profile">
                    <img src={profile_icon} alt="profile" />
                </div>
            </div>
        </>
    )
}
export default NavBar