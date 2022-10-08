import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    counts: {},
    report: { users: [], products: [], comments: [], payments: [] },
  },
  reducers: {
    updateCounts: (state, action) => {
      state.counts = action.payload;
    },
    updateReport: (state, action) => {
      state.report = action.payload;
    },
  },
});

export const { updateCounts, updateReport } = adminSlice.actions;
export default adminSlice.reducer;
