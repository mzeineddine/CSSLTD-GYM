import { useState } from "react";
import "./add_popup.css";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  TextField,
  MenuItem
} from "@mui/material";
import Textarea from '@mui/joy/Textarea';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


// import CloseIcon from '@mui/icons-material';
const Add_Popup = (props) => {
  const default_values = {};
  for (let [key, value] of Object.entries(props.fields)) {
    if(value == 'date'){
        default_values[key] = dayjs();
        continue
    }
    default_values[key] = "";
  }
  const [formData, setFormData] = useState(default_values);
  console.log(formData["date"])
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
  };
  const title = "Add " + props.name;
  const options = props.options;
  console.log(options);
  return (
    <Dialog open={props.open}>
      <DialogTitle>
        <div>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <div className="flex-col gap-1 h-[70vh] justify-center items-center">
          {Object.entries(props.fields).map(([k, v]) => {
            let isSelect = false;
            let isTextArea = false;
            let isText = false;
            let isNumber = false;
            let isDate = false;
            if (v == "select") {
              isSelect = true;
            } else if (v == "text-area") {
              isTextArea = true;
            } else if (v == "date"){
                isDate = true;
                // setFormData({...formData,[k]: getTodayDate})
            } else if (v == "number"){
                isNumber = true
            }
            return (
                <div key={k}>
                {isDate?
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DatePicker
                                label="Start Date Time"
                                value={formData[k] }
                                onChange={(newValue)=>{
                                    setFormData({...formData,[k]: newValue})
                                    }
                                }
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                :isTextArea?
                    <Textarea 
                        minRows={2}
                        label={k}
                        value={formData[k]}
                        onChange={(e)=>{
                            setFormData({...formData,[k]: e.target.value})
                            }
                        }
                        required 
                        placeholder="Comment"
                    />
                :isNumber?
                    <TextField 
                        fullWidth
                        label={k}
                        type="number"
                        value={formData[k]}
                        onChange={(e)=>{
                            setFormData({...formData,[k]: e.target.value})
                            }
                        }
                        required
                    >
                    </TextField> 
                :isSelect?
                    <TextField 
                        fullWidth
                        label={k}
                        value={formData[k]}
                        onChange={(e)=>{
                            setFormData({...formData,[k]: e.target.value})
                            }
                        }
                        required
                        select
                    >
                        {
                            options.map((value) => {
                                return <MenuItem value={value}>{value}</MenuItem>
                            })
                        }
                    </TextField> 
                :
                    <TextField 
                        fullWidth
                        label={k}
                        value={formData[k]}
                        onChange={(e)=>{
                            setFormData({...formData,[k]: e.target.value})
                            }
                        }
                        required
                    >
                    </TextField> 
                }
              </div>
            );
          })}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Confirm</Button>
      </DialogActions>
    </Dialog>
    // <div className='add-popup'>
    //     <div className="form-container">
    //     <h2 className='title'>{title}</h2>
    //         <form onSubmit={handleSubmit}>
    //             <div className='inputs'>
    //                 {
    //                     Object.entries(props.fields).map(([k,v]) => {
    //                         let isSelect=false
    //                         let isTextArea = false
    //                         if(v=="select"){
    //                             isSelect=true
    //                         } else if(v=="text-area"){
    //                             isTextArea=true
    //                         }
    //                         return(
    //                             <div key={k} className="input-label">
    //                                 <label htmlFor={k}>{k.toLowerCase()
    //                                     .split('_')
    //                                     .map((word) => {
    //                                         return word[0].toUpperCase() + word.slice(1);
    //                                     })
    //                                     .join(' ')}
    //                                 </label>
    //                                 {
    //                                     isSelect?
    //                                         <select className='w-full h-full' name={k} value={formData[k]}
    //                                             onChange={(e)=>{
    //                                                 setFormData({...formData,[k]: e.target.value})
    //                                                 }
    //                                             }
    //                                         >
    //                                             {options.map((value) => {
    //                                                 return <option value={value}>{value}</option>
    //                                             })}
    //                                         </select>
    //                                     : isTextArea?
    //                                         <textarea name={k} value={formData[k]}
    //                                         onChange={(e)=>{
    //                                             setFormData({...formData,[k]: e.target.value})
    //                                             }
    //                                         }
    //                                         >

    //                                         </textarea>
    //                                     :
    //                                         <input type={v} name={k}
    //                                             onChange ={(e)=>{
    //                                                 setFormData({...formData,[k]: e.target.value})
    //                                                 }
    //                                             }
    //                                             value={
    //                                                 formData[k]
    //                                             }
    //                                         />
    //                                 }
    //                             </div>
    //                         )
    //                     })
    //                 }
    //             </div>
    //             <div className="buttons-container">
    //                 <div className='buttons'>
    //                     <button type="button" className='cancel-button' onClick={()=>{setFormData(default_values);props.onClose()}}>Cancel</button>
    //                     <button type="button" className='submit-button'>Add {props}</button>
    //                 </div>
    //             </div>
    //         </form>
    //     </div>
    // </div>
  );
};
export default Add_Popup;
