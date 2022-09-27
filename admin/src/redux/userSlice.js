 import { createSlice } from "@reduxjs/toolkit";

 export const userSlice = createSlice({
   name: "user",
   initialState: {
     emailaddress:null
   },
   reducers: {
     update: (state, action) => {
       state.emailaddress = action.payload.emailaddress;
     },
     remove: (state) => { 
       state.emailaddress = null
     }
   }
 });


 export const { update, remove } = userSlice.actions;

 export default userSlice.reducer;