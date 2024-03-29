import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
// import { setAddress } from './addressReducer';

const initialState = {
  user: {
    id: '',
    username: '',
    email: '',
    fullname: '',
    avatar: '',
    role_idrole: '',
    referralCode: '',
    status: '',
    verification_status: '',
    store_idstore: '',
    googleLogin: '',
    referralBy_iduser: '',
  },
  isLogin: false,
};

const authReducer = createSlice({
  name: 'AuthReducer',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, username, email, fullname, avatar, role_idrole, referralCode, store_idstore, googleLogin, referralBy_iduser } =
        action.payload;

      state.user = {
        id,
        email,
        avatar,
        fullname,
        role_idrole,
        username,
        referralCode,
        store_idstore,
        googleLogin,
        referralBy_iduser,
      };
    },
    loginSuccess: (state) => {
      state.isLogin = true;
    },
    logoutSuccess: (state) => {
      state.isLogin = false;
      localStorage.removeItem('token');
      localStorage.removeItem('persist:root');
    },
    keepLoginSuccess: (state) => {
      state.isLogin = true;
    },
  },
});

export const login = (emailOrUsername, password) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        emailOrUsername,
        password,
      });

      const { data } = res.data;

      localStorage.setItem('token', data.token);
      dispatch(setUser(data.user));
      dispatch(loginSuccess());
      toast.success('login is successful');
      return data.user;
    } catch (err) {
      if (err && axios.isAxiosError(err)) {
        const axiosError = err;
        if (axiosError.response) {
          toast.error(axiosError?.response?.data);
        }
      } else {
        console.error('An unexpected error occurred:', err);
      }
    }
  };
};

export const register = createAsyncThunk("auth/register", async (userData) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      fullname: userData.username,
    });
    return res?.data?.message;
  } catch (err) {
    if (err && axios.isAxiosError(err)) {
      const axiosError = err;
      if (axiosError.response) {
        toast.error(err?.response?.data)
        throw err?.response?.data
      }
    } else {
      console.error('An unexpected error occurred:', err);
    }
  }
});

export const keepLogin = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');

      if (token) {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/keepLogin`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        dispatch(setUser(res?.data?.data));
        dispatch(keepLoginSuccess());
      } else if (!token) {
        localStorage.removeItem('persist:root');
      }
    } catch (err) {
      localStorage.removeItem('token');
      localStorage.removeItem('persist:root');
      toast(err?.response?.data);
    }
  };
};

export const {
  setUser,
  setLocation,
  loginSuccess,
  logoutSuccess,
  keepLoginSuccess,
} = authReducer.actions;

export default authReducer.reducer;