import { useContext, useState, useEffect, useRef } from "react";
import {
  TextField,
  Paper,
  MenuItem,
  ClickAwayListener,
  InputAdornment,
  debounce,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Members_Context } from "../../context/Members_Context";

const Search_Member = () => {
  const { members } = useContext(Members_Context);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const listRef = useRef(null);

  // const handleSearch = (e) => {
  //   const value = e.target.value;
  //   setSearchTerm(value);

  //   if (value.trim() === "") {
  //     setFilteredMembers([]);
  //     setShowDropdown(false);
  //     setHighlightIndex(-1);
  //     return;
  //   }

  //   const filtered = members.filter((member) =>
  //     member.full_name.toLowerCase().includes(value.toLowerCase())
  //   );
  //   setFilteredMembers(filtered);
  //   setShowDropdown(true);
  //   setHighlightIndex(0); // Start at the first item
  // };

  const debouncedSearch = debounce((value) => {
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
  }, 700);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleSelect = (member) => {
    setSearchTerm(member.full_name);
    setShowDropdown(false);
    setHighlightIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!showDropdown) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % filteredMembers.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev <= 0 ? filteredMembers.length - 1 : prev - 1
      );
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      handleSelect(filteredMembers[highlightIndex]);
    }
  };

  // Auto-scroll into view the highlighted item
  useEffect(() => {
    if (listRef.current && highlightIndex >= 0) {
      const item = listRef.current.children[highlightIndex];
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightIndex]);

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
        onKeyDown={handleKeyDown}
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
          "& .MuiInputLabel-root": {},
          "& .Mui-focused.MuiInputLabel-root": {
            color: "blueviolet",
          },
        }}
      />

      {showDropdown && filteredMembers.length > 0 && (
        <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
          <Paper
            elevation={3}
            ref={listRef}
            style={{
              position: "relative",
              width: "100%",
              zIndex: 10,
              maxHeight: 150,
              overflowY: "auto",
              marginTop: 4,
            }}
          >
            {filteredMembers.map((member, index) => (
              <MenuItem
                key={member.id}
                onClick={() => handleSelect(member)}
                selected={index === highlightIndex}
              >
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
