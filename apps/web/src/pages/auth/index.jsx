/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { keepLogin } from '../../redux/reducer/authReducer';

export const Auth = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(keepLogin());
  }, [dispatch]);

  return <>{children}</>;
};
