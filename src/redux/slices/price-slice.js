import { createSlice } from "@reduxjs/toolkit";

const priceSlice = createSlice({
  name: "price",
  initialState: {
    priceHero: {},
    isPriceLoading: false,
    pricePlan: [],
    feature: [],
  },
  reducers: {
    setPriceHero: (state, action) => {
      state.priceHero = action.payload;
    },
    setPricePlan: (state, action) => {
      state.pricePlan = action.payload;
    },

    setIsPriceLoading: (state, action) => {
      state.isPriceLoading = action.payload;
    },
    setFeature: (state, action) => {
      state.feature = action.payload;
    },
  },
});

export default priceSlice.reducer;
export const { setPriceHero, setPricePlan, setFeature, setIsPriceLoading } =
  priceSlice.actions;
