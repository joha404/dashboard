import { createSlice } from "@reduxjs/toolkit";

const buySellSlice = createSlice({
  name: "buySell",
  initialState: {
    buySellData: {},
    isBuySellLoading: false,
  },
  reducers: {
    setBuySellData: (state, action) => {
      state.buySellData = action.payload;
    },

    setIsBuySellLoading: (state, action) => {
      state.isBuySellLoading = action.payload;
    },
  },
});

export default buySellSlice.reducer;
export const { setBuySellData, setIsBuySellLoading } = buySellSlice.actions;
