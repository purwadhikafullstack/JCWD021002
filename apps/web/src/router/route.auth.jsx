import { LoginRoute } from './protection.route';
import { Login } from '../pages/auth/login';
import { Register } from '../pages/auth/register';
import { SentMailSuccess } from '../pages/auth/sentMailSuccess';
import { SetPassword } from '../pages/auth/password/setPassword';
import { ResetPassword } from '../pages/auth/password';
import { Verify } from '../pages/auth/verifikasi/verify';
import { SetNewPassword } from '../pages/auth/password/setNewPassword';
import { Success } from '../pages/auth/Success';
import { VerifyForgetPassword } from '../pages/auth/verifikasi/verifyForgetPassword';
import { VerifyAccount } from '../pages/auth/verifikasi/verifyAccount';

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
    path: '/sentMailSuccess',
    element: (
      <LoginRoute>
        <SentMailSuccess />
      </LoginRoute>
    ),
  },
  {
    path: '/verify',
    element: (
      <LoginRoute>
        <Verify />
      </LoginRoute>
    ),
    children: [
      { path: 'forget-password', element: <VerifyForgetPassword /> },
      { path: 'email', element: <VerifyAccount /> },
    ],
  },
  {
    path: '/password',
    element: (
      <LoginRoute>
        <ResetPassword />
      </LoginRoute>
    ),
    children: [
      { index: true, element: <SetPassword /> },
      { path: 'new', element: <SetNewPassword /> },
      { path: 'success', element: <Success /> },
    ],
  },
];

export default routeAuth;