import { LoginRoute } from '../pages/auth/loggedInUser';
import { Login } from '../pages/login';
import { Register } from '../pages/register';
import { VerifySentMail } from '../pages/register/verifySentMail';
import { SetPassword } from '../pages/setPassword';

const routeAuth = [
  {
    path: '/login',
    element: (
      <LoginRoute>
        <Login />
      </LoginRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <LoginRoute>
        <Register />
      </LoginRoute>
    ),
  },
  {
    path: '/set-password',
    element: (
      <LoginRoute>
        <SetPassword />
      </LoginRoute>
    ),
  },
  {
    path: '/verifysentmail',
    element: (
      <LoginRoute>
        <VerifySentMail />
      </LoginRoute>
    ),
  },
];

export default routeAuth;
