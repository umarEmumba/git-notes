import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { gistsApiUrl } from "../../constants";
import { gistsFunctions } from "../../utils/gistsService";
import { getGistsParamType, gistsSliceType } from "./types";

export const fetchGists : any = createAsyncThunk(
    gistsApiUrl,
    async ({page, func,accessToken}: getGistsParamType) => {
      const response = await gistsFunctions[func](page,accessToken);
      return {response,page};
    }
  );

const initialState : gistsSliceType = {
        gists : [],
        searchQuery : "",
        status : 'idle',
        error: null,
        page: 1,
    };
    
const gistsSlice = createSlice({
    name: "gists",
    initialState,
    reducers: {
        setSearchQuery :  (state,action) => {state.searchQuery = action.payload},
    },
    extraReducers: (builder) =>  {
        builder.addCase(
            fetchGists.pending, (state) => {
            state.status = 'loading';
        }
        );
        builder.addCase(
            fetchGists.rejected, (state,action) => {
                state.status = 'failed';
                state.error = action.error.message;
            }
            );
            builder.addCase(
                fetchGists.fulfilled, (state,action) => {
                state.status = 'succeeded';
                state.gists  = action.payload.response;
                state.page   = action.payload.page;
            }
        );
    },
});

export const { setSearchQuery } = gistsSlice.actions;
export default gistsSlice.reducer;