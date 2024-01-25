import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { keepLogin } from '../redux/reducer/authReducer'; 

const withRoleRestriction = (allowedRoles) => (WrappedComponent) => {
  const RoleRestrictedComponent = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const { user } = useSelector((state) => state.AuthReducer);

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
      console.log('Role allowed. Rendering component.');
      return <WrappedComponent {...props} />;
    } else {
      console.log('Role not allowed. Redirecting to "/"');
      // Redirect to a different route if the role is not allowed
      // Navigate to your login page or another appropriate route
      // Example: <Navigate to="/login" />;
      return <Navigate to="/" />;
    }
  };

  return RoleRestrictedComponent;
};

export default withRoleRestriction;

