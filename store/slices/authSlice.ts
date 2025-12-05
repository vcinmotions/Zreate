import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = { id?: string; name?: string; email?: string };

type AuthState = {
  user: User | null;
  token: string | null;
};

const initialState: AuthState = {
  user: null,

  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ token: string; user: any }>) => {
      // ✅ Save to localStorage immediately!

      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout(state) {
      // ✅ Clear localStorage on logout
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.user = null;
      state.token = null;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
