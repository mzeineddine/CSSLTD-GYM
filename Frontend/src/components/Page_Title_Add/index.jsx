import { useState } from "react";
import "./page_title_add.css";
import Add_Popup from "../Add_Popup";
import { Members_Context } from "../../context/Members_Context";
const Page_Title_Add = (props) => {
  // const navigate = new useNavigate();
  const name = props.name;
  const handleOnClick = () => {
    setShowModal(true);
  };
  const data_id = props.data ? props.data.id : 0;
  const [showModal, setShowModal] = useState(false);
  const change_id = props.id_change ? props.id_change : "";
  return (
    <div className="page-title-add">
      <div className="title">
        <h2>{name.split("_").join(" ")}</h2>
      </div>
      <div className="add">
        <button onClick={handleOnClick}>
          <p>+</p>
          <p>Add {name.split("_").join(" ")}</p>
        </button>
        <Add_Popup
          open={showModal}
          onClose={() => setShowModal(false)}
          options={props.options}
          fields={props.fields}
          filled_field={{ [change_id]: data_id }}
          name={
            props.name.toLowerCase() != "staff"
              ? props.name.charAt(0).toUpperCase() +
                props.name.slice(1).toLowerCase()
              : "user"
          }
        />
      </div>
    </div>
  );
};
export default Page_Title_Add;
