import { useContext, useState } from "react";
import {
  TextField,
  Paper,
  MenuItem,
  ClickAwayListener,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Members_Context } from "../../context/Members_Context";

const Search_Member = () => {
  const { members } = useContext(Members_Context);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredMembers([]);
      setShowDropdown(false);
      return;
    }

    const filtered = members.filter((member) =>
      member.full_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMembers(filtered);
    setShowDropdown(true);
  };

  const handleSelect = (member) => {
    setSearchTerm(member.full_name);
    setShowDropdown(false);
  };

  return (
    <div style={{ width: "100%", maxHeight: "30px" }}>
      <TextField
        fullWidth
        type="search"
        label="Search members"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        onFocus={() => {
          if (filteredMembers.length > 0) setShowDropdown(true);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="1em" color="action" />
            </InputAdornment>
          ),
        }}
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
            padding: "0 8px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ccc",
          },
          "& .MuiInputLabel-root": {
          },

          "& .Mui-focused.MuiInputLabel-root": {
            color: "blueviolet",
          },
        }}
      />

      {showDropdown && filteredMembers.length > 0 && (
        <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
          <Paper
            elevation={3}
            style={{
              position: "relative",
              width: "100%",
              zIndex: 10,
              maxHeight: 150,
              overflowY: "auto",
              marginTop: 4,
            }}
          >
            {filteredMembers.map((member) => (
              <MenuItem key={member.id} onClick={() => handleSelect(member)}>
                {member.full_name}
              </MenuItem>
            ))}
          </Paper>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default Search_Member;
