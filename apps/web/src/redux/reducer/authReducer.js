import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  user: {
    username: "",
    email: "",
    avatar: "",
  },
  isLogin: false,
};

const authReducer = createSlice({
  name: "AuthReducer",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { username, email, avatar } = action.payload;

      state.user = {
        username,
        email,
        avatar,
      };
    },
    loginSuccess: (state) => {
      state.isLogin = true;
    },
    logoutSuccess: (state) => {
      state.isLogin = false;
      localStorage.removeItem("token");
    },
    keepLoginSuccess: (state) => {
      state.isLogin = true;
    },
  },
});

export const login = (emailOrUsername, password) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('http://localhost:8000/api/auth/login', {
        emailOrUsername,
        password,
      });

      const { data } = res.data

      localStorage.setItem("token", data.token);
      dispatch(setUser(data.user));
      dispatch(loginSuccess());
      toast.success("login is successful");
      return data.user;
    } catch (err) {
      if (err && axios.isAxiosError(err)) {
        const axiosError = err;
        if (axiosError.response) {
          toast.error("Login failed");
        }
      } else {
        console.error("An unexpected error occurred:", err);
      }
    }
  };
};

export const register = async (username, email, password) => {
    try {
      await axios.post('http://localhost:8000/api/auth/register', {
        username,
        email,
        password,
        fullname: username,
      });
      toast.success(`A verification email has been sent to ${email}. Please check your inbox.`);
      return "register success"
    } catch (err) {
      if (err && axios.isAxiosError(err)) {
        const axiosError = err;
        if (axiosError.response) {
          toast.error(err.response?.data);
        }
      } else {
        console.error("An unexpected error occurred:", err);
      }
    }
  };

export const keepLogin = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const res = await axios.get(
          "http://localhost:8080/auth/keep-login",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(setUser(res?.data?.data));
        dispatch(keepLoginSuccess());
      }
    } catch (err) {
      localStorage.removeItem("token");
      if (err && axios.isAxiosError(err)) {
        const axiosError = err;
        if (axiosError.response) {
          toast.error("Invalid Token");
        }
      } else {
        console.error("An unexpected error occurred:", err);
      }
    }
  };
};

export const {
  setUser,
  loginSuccess,
  logoutSuccess,
  keepLoginSuccess,
} = authReducer.actions;

export default authReducer.reducer;
