import { Search } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { setSearchQuery } from '../../../store/gists';

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = () => 
{
  const [searchString, setSearchString] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const onSearchChange = (e : ChangeEvent<HTMLInputElement  | HTMLTextAreaElement>) => {
    setSearchString(e.target.value);
    dispatch(setSearchQuery(e.target.value));
  }
  const searchBarStyle = {
    fieldset: { borderColor: "white" },
    width : "200px",
    "&:hover" : {
      borderColor : "white",
    },
    "div.Mui-focused" : {
      border : "1px solid white",
    },
  }
  return (
  <TextField
    className="text-white border-white"
    size='small'
    color='primary'
    placeholder="Search Notes..."
    variant="outlined"
    value = {searchString}
    InputLabelProps={{
      shrink: false,
    }}
    onChange = {(e)=>onSearchChange(e)}
    sx={searchBarStyle}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <Search color="secondary" fontSize='small'/>
        </InputAdornment>
      )
  }}
/>
);
}

export default SearchBar;
