import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contactUs",
  initialState: {
    contactUsData: {},
    isStatsLoading: false,
    contactUsPageData: {},
  },
  reducers: {
    setContactData: (state, action) => {
      state.contactUsData = action.payload;
    },
    setContactUsPageData: (state, action) => {
      state.contactUsPageData = action.payload;
    },
    setIsStatsLoading: (state, action) => {
      state.isStatsLoading = action.payload;
    },
  },
});

export default contactSlice.reducer;
export const { setContactData, setContactUsPageData, setIsStatsLoading } =
  contactSlice.actions;
