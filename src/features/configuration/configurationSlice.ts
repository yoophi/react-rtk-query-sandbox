import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface ConfigurationState {
    baseUrl: string;
}

const initialState: ConfigurationState = {
  baseUrl: "http://google.com/",
};

export const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    setBaseUrl: (state, action: PayloadAction<string>) => {
      state.baseUrl = action.payload;
    }
  },
});

export const { setBaseUrl } = configurationSlice.actions;
export const selectBaseUrl = (state: RootState) => state.configuration.baseUrl;
export default configurationSlice;
