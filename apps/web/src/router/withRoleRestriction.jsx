import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { keepLogin } from '../redux/reducer/authReducer';

const withRoleRestriction = (allowedRoles) => (WrappedComponent) => {
  const RoleRestrictedComponent = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const { user, isLogin } = useSelector((state) => state.AuthReducer);

    useEffect(() => {
      const fetchData = async () => {
        try {
          // Dispatch an action to fetch or keep the user logged in
          await dispatch(keepLogin());

          // setLoading to false once user data is available
          setLoading(false);
        } catch (error) {
          // Handle error if needed
          console.error('Error fetching user data:', error);
          setLoading(false);
        }
      };

      fetchData();
    }, [dispatch]);

    // Check if loading or user has the required role
    if (loading) {
      // Return loading indicator or null
      return <div>Loading...</div>;
    }

    if (user && allowedRoles.includes(user.role_idrole)) {
      return <WrappedComponent {...props} />;
    } else {
      // Redirect to a different route if the role is not allowed
      // Navigate to your login page or another appropriate route
      // Example: <Navigate to="/login" />;
      let redirectToPage = '';
      if (user.role_idrole == 3) {
        redirectToPage = '/';
      } else if (user.role_idrole == 2  && isLogin || user.role_idrole == 1  && isLogin) {
        redirectToPage = '/dashboard';
      } else {
        redirectToPage = '/';
      }
      return <Navigate to={redirectToPage} />;
    }
  };

  return RoleRestrictedComponent;
};

export default withRoleRestriction;
