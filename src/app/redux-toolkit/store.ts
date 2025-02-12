import { configureStore } from "@reduxjs/toolkit";
import apiWebResources from "./apiWebResources";
import apiUsersResources from "./apiUsersResources";
import isUserStates from "./userStates";

const store = configureStore({
  reducer: {
    apiResources: apiWebResources,
    apiUsers: apiUsersResources,
    userStates: isUserStates,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
