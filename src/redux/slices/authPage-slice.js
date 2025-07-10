import { createSlice } from "@reduxjs/toolkit";

const authPageSlice = createSlice({
  name: "buySell",
  initialState: {
    authPageData: {},
    isAuthPageLoading: false,
  },
  reducers: {
    setAuthPageData: (state, action) => {
      state.authPageData = action.payload;
    },

    setIsAuthPageLoading: (state, action) => {
      state.isAuthPageLoading = action.payload;
    },
  },
});

export default authPageSlice.reducer;
export const { setAuthPageData, setIsAuthPageLoading } = authPageSlice.actions;
