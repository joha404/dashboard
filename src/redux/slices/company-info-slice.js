import { createSlice } from "@reduxjs/toolkit";

const companyInfoSlice = createSlice({
  name: "companyInfo",
  initialState: {
    companyInfoData: {},
    isCompanyInfoLoading: false,
  },
  reducers: {
    setCompanyInfoData: (state, action) => {
      state.companyInfoData = action.payload;
    },

    setIsCompanyInfoLoading: (state, action) => {
      state.isCompanyInfoLoading = action.payload;
    },
  },
});

export default companyInfoSlice.reducer;
export const { setCompanyInfoData, setIsCompanyInfoLoading } =
  companyInfoSlice.actions;
