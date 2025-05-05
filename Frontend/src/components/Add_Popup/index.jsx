import { useState } from 'react';
import "./add_popup.css"
const Add_Popup = (props) => {
    const default_values = {}
    for (let [key, _] of Object.entries(props.fields)) {
        default_values[key] = ""
    }
    const [formData, setFormData] = useState(default_values)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("form submitted")
    }
    const title = "Add "+props.name
    return (
        <div className='add-popup'>
            <div className="form-container">
            <h2 className='title'>{title}</h2>
                <form onSubmit={handleSubmit}>
                    <div className='inputs'>
                        {
                            Object.entries(props.fields).map(([k,v]) => {
                                return(
                                    <div key={k} className="input-label">
                                        <label htmlFor={k}>{k.toLowerCase()
                                            .split('_')
                                            .map((word) => {
                                                return word[0].toUpperCase() + word.slice(1);
                                            })
                                            .join(' ')}
                                        </label>
                                        <input type={v} name={k} 
                                            onChange ={(e)=>{
                                                setFormData({...formData,[k]: e.target.value})
                                                }
                                            }
                                            value={
                                                formData[k]
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