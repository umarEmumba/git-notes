import { createSlice } from "@reduxjs/toolkit";

import { snackBarSliceType } from "./types";


const initialState : snackBarSliceType = {
        message : "",
        isOpen : false,
    };
    
const gistsSlice = createSlice({
    name: "snackBar",
    initialState,
    reducers: {
        toggleSnackBar :  (state,action) => { state.isOpen = !state.isOpen },
        setSnackBarMessage : (state,action) => { state.message = action.payload; state.isOpen = true; }
    },
});

export const { toggleSnackBar, setSnackBarMessage } = gistsSlice.actions;
export default gistsSlice.reducer;