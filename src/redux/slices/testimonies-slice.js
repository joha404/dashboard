import { createSlice } from "@reduxjs/toolkit";
const testimoniesSlice = createSlice({
  name: "testimonies",
  initialState: {
    testimoniesData: {},
    testimoniesArray: [],
    isTestimoniesLoading: false,
  },
  reducers: {
    setTestimoniesData: (state, action) => {
      state.testimoniesData = action.payload;
    },
    setTestimoniesArray: (state, action) => {
      state.testimoniesArray = action.payload;
    },
    setIsTestimoniesLoading: (state, action) => {
      state.isTestimoniesLoading = action.payload;
    },
  },
});
export default testimoniesSlice.reducer;
export const {
  setTestimoniesData,
  setTestimoniesArray,
  setIsTestimoniesLoading,
} = testimoniesSlice.actions;
