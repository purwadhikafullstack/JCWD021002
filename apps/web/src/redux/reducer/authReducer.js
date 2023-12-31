import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
  user: {
    id: '',
    username: '',
    email: '',
    fullname: '',
    avatar: '',
    role_idrole: '',
    status: '',
    verification_status: '',
  },
  location: [],
  isLogin: false,
};

const authReducer = createSlice({
  name: 'AuthReducer',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, username, email, fullname, avatar, role_idrole } =
        action.payload;

      state.user = {
        id,
        email,
        avatar,
        fullname,
        role_idrole,
        username,
      };
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    loginSuccess: (state) => {
      state.isLogin = true;
    },
    logoutSuccess: (state) => {
      state.isLogin = false;
      localStorage.removeItem('token');
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

      const { data } = res.data;

      localStorage.setItem('token', data.token);
      console.log('data login', data);
      dispatch(setUser(data.user));
      dispatch(loginSuccess());
      toast.success('login is successful');
      return data.user;
    } catch (err) {
      if (err && axios.isAxiosError(err)) {
        const axiosError = err;
        if (axiosError.response) {
          console.log(axiosError.response)
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
    const res = await axios.post('http://localhost:8000/api/auth/register', {
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
        console.log(err.response);
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
          'http://localhost:8000/api/auth/keepLogin',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        dispatch(setUser(res?.data?.data));
        dispatch(keepLoginSuccess());
      }
    } catch (err) {
      localStorage.removeItem('token');
      console.log(err);
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
