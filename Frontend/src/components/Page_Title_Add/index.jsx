import { useState } from "react"
import "./page_title_add.css"
import Add_Popup from "../Add_Popup"
const Page_Title_Add = (props) => {
    // const navigate = new useNavigate();
    const name = props.name.charAt(0).toUpperCase() + props.name.slice(1).toLowerCase()
    const handleOnClick = () => {
        console.log("add",name)
        setShowModal(true)
    }
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="page-title-add">
            <div className="title"><h2>{name}</h2></div>
            <div className="add">
                <button onClick={handleOnClick}><p>+</p><p>Add {name}</p></button>
                {showModal && <Add_Popup onClose={() => setShowModal(false)} fields={props.fields} name={name}/>}
            </div>
        </div>
    );
}
export default Page_Title_Add