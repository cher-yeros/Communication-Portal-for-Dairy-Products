import { createSlice } from "@reduxjs/toolkit";

export const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    counts: {},
    selectedUser: {},
  },
  reducers: {
    updateSellerCounts: (state, action) => {
      state.counts = action.payload;
    },
    updateSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { updateSellerCounts, updateSelectedUser } = sellerSlice.actions;
export default sellerSlice.reducer;
