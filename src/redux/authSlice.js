import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser,getProfile,updateProfile, changePassword } from "./authActions";
import { toast } from "react-toastify";

const authToken = localStorage.getItem("auth_token");
const data = JSON.parse(localStorage.getItem("data_user"));
const authSlice = createSlice({
  name: "auth",
  initialState: {
    authToken,
    data,
    loading: false,
    error: null,
    success: false,
    userDetail: null,
    userProfile:{}
  },
  reducers: {
    updateUser: (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
    logout: (state, action) => {
      state.data = {};
      localStorage.removeItem("auth_token");
      localStorage.removeItem("data_user");
      window.location.reload();
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
        state.authToken = payload.token;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(registerUser.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
        state.success=false;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;       
        state.success=true; 
        toast.success("Register success !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        toast.error("Register false! "+payload, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .addCase(getProfile.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
        state.success=false;
      })
      .addCase(getProfile.fulfilled, (state, { payload }) => {
        state.userDetail=payload;        
        state.loading = false;
        state.success=true;
      })
      .addCase(getProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(updateProfile.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
        state.success=false;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.data=payload;        
        state.loading = false;
        state.success=true;
        toast.success("Update profile success !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .addCase(updateProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(changePassword.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
        state.success=false;
      })
      .addCase(changePassword.fulfilled, (state, { payload }) => {
        state.data=payload;        
        state.loading = false;
        state.success=true;
        toast.success("Update profile success !", {
          position: toast.POSITION.TOP_RIGHT,
          delay:1000
        });
      })
      .addCase(changePassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        toast.error(payload,{
          position:toast.POSITION.TOP_RIGHT,
          delay:1000
        })
      });
  },
});
export const { logout, setCredentials } = authSlice.actions;
export const selectUserDetail = (state) => state.auth.data;

export default authSlice.reducer;
