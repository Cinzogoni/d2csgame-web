import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserStates = {
  formType: "login" | "signup";
};

const initialState: UserStates = {
  formType: "login",
};

const userSlice = createSlice({
  name: "userStates",
  initialState,
  reducers: {
    setFormType: (state, action: PayloadAction<"login" | "signup">) => {
      state.formType = action.payload;
    },
  },
});

const isUserStates = userSlice.reducer;

export const { setFormType } = userSlice.actions;
export default isUserStates;
