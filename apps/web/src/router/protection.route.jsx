/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';

export const ProtectLoginRoute = ({ children }) => {
  const isLogin = useSelector((state) => state.AuthReducer.isLogin);
  const userRole = useSelector((state) => state.AuthReducer?.user?.role_idrole);

  if (isLogin) {
    if (userRole == 1 || userRole == 2) {
      return <Navigate to="/dashboard" />;
    } else if (userRole == 3) {
      return <Navigate to="/" />;
    }
  } else {
    return <>{children}</>;
  }

  return <>{children}</>;
};

export const ProtectLoggedInUser = ({ children }) => {
  const checkToken = localStorage.getItem('token');

  if (checkToken) {
    return <>{children}</>;
  } else if (!checkToken) {
    return <Navigate to="/" />;
  }
};

export const ProtectAdminRoute = ({ children }) => {
  const userRole = useSelector((state) => state.AuthReducer?.user?.role_idrole);
  if (userRole == 1 || userRole == 2) {
    return <>{children}</>;
  } else if (userRole == 3) {
    return <Navigate to="/" />;
  }
};

export const ProtectSuperAdminRoute = ({ children }) => {
  const userRole = useSelector((state) => state.AuthReducer?.user?.role_idrole);
  if (userRole == 1) {
    return <>{children}</>;
  } else if (userRole == 2) {
    return <Navigate to="/dashboard" />;
  } else if (userRole == 3) {
    return <Navigate to="/" />;
  }
};

export const ProtectStoreAdminRoute = ({ children }) => {
  const checkToken = localStorage.getItem('token');
  const userRole = useSelector((state) => state.AuthReducer?.user?.role_idrole);

  if (checkToken) {
    if (userRole == 2) {
      return <Navigate to={'/dashboard'} />;
    } else if (userRole == 1) {
      return <Navigate to={'/'} />;
    } else if (userRole == 3) {
      return <>{children}</>;
    }
  } else {
    return <>{children}</>;
  }
};

export const ProtectUserRoute = ({ children }) => {
  const userRole = useSelector((state) => state.AuthReducer?.user?.role_idrole);
  if (userRole == 2) {
    return <Navigate to={'/dashboard'} />;
  } else {
    return <>{children}</>;
  }
};
