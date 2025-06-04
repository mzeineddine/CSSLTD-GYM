import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Members_Context } from "../../context/Members_Context";
import { useContext,} from "react";
import { useNavigate } from "react-router-dom";

export default function Search_Member() {
  const { members, update_members } = useContext(Members_Context);
  const navigate = useNavigate();
  if(!members) update_members()
  return (
    <Autocomplete
      disablePortal
      options={members}
      getOptionLabel={(member)=>{return member.full_name}}
      onChange={(event, member)=>{ navigate("/member_profile", { state: member["id"] });}}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Member"
          fullWidth
          sx={{
            m: 0,
            p: 0,
            "& .MuiOutlinedInput-root": {
              height: "30px",
              padding: "1em",
              borderRadius: "15px",
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "blueviolet",
              },
            },
            "& .MuiOutlinedInput-input": {
              padding: "0 10px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ccc",
            },
            "& .MuiInputLabel-root": {
              top: -10,
            },
            "& .Mui-focused.MuiInputLabel-root": {
              color: "blueviolet",
            },
          }}
        />
      )}
    />
  );
}
