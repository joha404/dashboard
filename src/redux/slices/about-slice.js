import { createSlice } from "@reduxjs/toolkit";

const aboutSlice = createSlice({
  name: "about",
  initialState: {
    stats: {},
    isStatsLoading: false,
  },
  reducers: {
    setStats: (state, action) => {
      state.stats = action.payload;
    },
    setIsStatsLoading: (state, action) => {
      state.isStatsLoading = action.payload;
    },
  },
});

export default aboutSlice.reducer;
export const { setStats, setIsStatsLoading } = aboutSlice.actions;
