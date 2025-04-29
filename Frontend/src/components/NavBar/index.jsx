import profile_icon from "../../assets/icons/profile_icon.svg"
import "./navBar.css"
const NavBar = () => {
    const name = "Mohammad";
    return(
        <>
            <div className="navBar">
                <p>Hello, {name}</p>
                <div className="search">
                    <input type="search"  placeholder="Search..."/>
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