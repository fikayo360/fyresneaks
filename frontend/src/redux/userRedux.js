import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    emailaddress:""
  },
  reducers: {
    update(state, action) {
      state.emailaddress = action.payload.emailaddress;
    },
    logout (state) {
      state.emailaddress = ""
    }
  }
});

export const { update, logout } = userSlice.actions;

export default userSlice.reducer;