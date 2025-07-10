import { createSlice } from "@reduxjs/toolkit";

const sellHeroSlice = createSlice({
  name: "sellHero",
  initialState: {
    sellHeroData: {},
    isSellHeroLoading: false,
  },
  reducers: {
    setSellHeroData: (state, action) => {
      state.sellHeroData = action.payload;
    },
    setIsSellHeroLoading: (state, action) => {
      state.isSellHeroLoading = action.payload;
    },
  },
});

export default sellHeroSlice.reducer;
export const { setSellHeroData, setIsSellHeroLoading } = sellHeroSlice.actions;
