/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';

export const LoginRoute = ({ children }) => {
  const isLogin = useSelector((state) => state.AuthReducer.isLogin);

  const user = useSelector((state) => state.AuthReducer.user);

  const role = user.role_idrole;

  if (isLogin) {
    if (role == 1) {
      return <Navigate to="/superAdmin" />;
    } else if (role == 2) {
      return <Navigate to="/admin" />;
    } else if (role == 3) {
      return <Navigate to="/" />;
    }
  } else {
    return <>{children}</>;
  }

  return <>{children}</>;
};

export const LoggedInUser = ({ children }) => {
  const checkToken = localStorage.getItem('token');
  if (checkToken) {
    return <>{children}</>;
  } else if (!checkToken) {
    return <Navigate to="/" />;
  }
};
