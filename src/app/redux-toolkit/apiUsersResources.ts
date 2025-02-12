import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../types/dataType";
import { apiUsers } from "../services/ProductService";

export const fetchUsers = createAsyncThunk("api/fetchUsers", apiUsers);

interface UserState {
  currentUser: User | null;
  apiLoading: boolean;
  apiError: string | null;
}

const initialState: UserState = {
  currentUser: null,
  apiLoading: false,
  apiError: null,
};

const apiUsersSlice = createSlice({
  name: "apiUsers",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.apiLoading = true;
        state.apiError = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.apiLoading = false;
        state.currentUser =
          action.payload.length > 0 ? action.payload[0] : null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.apiLoading = false;
        state.apiError = action.error.message || "Failed to fetch users";
      });
  },
});

const apiUsersResources = apiUsersSlice.reducer;

export const { loginSuccess, logout } = apiUsersSlice.actions;
export default apiUsersResources;
