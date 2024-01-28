import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  address: {
    id: '',
    user_iduser: '',
    addressLine: '',
    city_idcity: '',
    postalCode: '',
    recipientNames: '',
    recipientsMobileNumber: '',
    addressLabel: '',
    addressDetail: '',
    isMain: '',
    latitude: '',
    longitude: '',
    City: null,
  },
};

const addressReducer = createSlice({
  name: 'addressReducer',
  initialState,
  reducers: {
    setAddress: (state, action) => {
      const {
        id,
        user_iduser,
        addressLine,
        city_idcity,
        postalCode,
        recipientNames,
        recipientsMobileNumber,
        addressLabel,
        addressDetail,
        isMain,
        latitude,
        longitude,
        City
      } = action.payload;

      state.address = {
        id,
        user_iduser,
        addressLine,
        city_idcity,
        postalCode,
        recipientNames,
        recipientsMobileNumber,
        addressLabel,
        addressDetail,
        isMain,
        latitude,
        longitude,
        City: { ...City }
      }
    },
  },
});

export const {
  setAddress
} = addressReducer.actions

export default addressReducer.reducer;
