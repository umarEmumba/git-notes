import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import gistsSlice from "./gists/gistsSlice";
import { gistsSliceType } from "./gists/types";
import snackBarSlice from "./snackBar/snackBarSlice";
import { snackBarSliceType } from "./snackBar/types";
 
export const store = configureStore({
  reducer: {
    gists: gistsSlice,
    snackBar : snackBarSlice,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type storeStateType = {
    gists : gistsSliceType;
    snackBar : snackBarSliceType;
}
