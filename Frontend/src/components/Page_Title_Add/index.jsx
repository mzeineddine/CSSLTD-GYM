import { useState } from "react"
import "./page_title_add.css"
import Add_Popup from "../Add_Popup"
import { Members_Context } from "../../context/Members_Context"
const Page_Title_Add = (props) => {
    // const navigate = new useNavigate();
    const name = props.name.toLowerCase() != "user" ? props.name.charAt(0).toUpperCase() + props.name.slice(1).toLowerCase():"Staff"
    const handleOnClick = () => {
        setShowModal(true)
    }
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="page-title-add">
            <div className="title"><h2>{name}</h2></div>
            <div className="add">
                <button onClick={handleOnClick}><p>+</p><p>Add {name}</p></button>
                <Add_Popup open={showModal} onClose={() => setShowModal(false)} options={props.options} fields={props.fields} name={name}/>
            </div>
        </div>
    );
}
export default Page_Title_Add