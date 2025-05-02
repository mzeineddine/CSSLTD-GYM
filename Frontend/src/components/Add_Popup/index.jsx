import { useState } from 'react';
import "./add_popup.css"
const Add_Popup = (props) => {
    const prop = {fields:["fullName","contact","address","date_of_birth"]}
    const default_values = {}
    prop.fields.forEach(field => {
        default_values[field] = ""
    });
    
    // const [formData, setFormData] = useState({
    //     fullName: '',
    //     contact: '',
    //     address: '',
    //     date_of_birth: '',
    // })
    const [formData, setFormData] = useState(default_values)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("form submitted")
    }
    const title = "add member"
    return (
        <div className='add-popup'>
            <div className="form-container">
            <h2 className='title'>{title}</h2>
                <form onSubmit={handleSubmit}>
                    <div className='inputs'>
                        {
                            prop.fields.map((value, index) => {
                                return(
                                    <div key={index} className="input-label">
                                        <label htmlFor={value}>{value}</label>
                                        <input type="text" name={value} 
                                            onChange ={(e)=>{
                                                setFormData({...formData,[value]: e.target.value})
                                                console.log(formData[value])
                                                }
                                            }
                                            value={
                                                formData[value]
                                            }
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="buttons-container">
                        <div className='buttons'>
                            <button type="button" className='cancel-button' onClick={()=>{setFormData(default_values);props.onClose()}}>Cancel</button>
                            <button type="button" className='submit-button'>Add Patient</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Add_Popup;