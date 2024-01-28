import { ProtectLoginRoute } from './protection.route';
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
      <ProtectLoginRoute>
        <Login />
      </ProtectLoginRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <ProtectLoginRoute>
        <Register />
      </ProtectLoginRoute>
    ),
  },
  {
    path: '/set-password',
    element: (
      <ProtectLoginRoute>
        <SetPassword />
      </ProtectLoginRoute>
    ),
  },
  {
    path: '/sentMailSuccess',
    element: (
      <ProtectLoginRoute>
        <SentMailSuccess />
      </ProtectLoginRoute>
    ),
  },
  {
    path: '/verify',
    element: (
      <ProtectLoginRoute>
        <Verify />
      </ProtectLoginRoute>
    ),
    children: [
      { path: 'forget-password', element: <VerifyForgetPassword /> },
      { path: 'email', element: <VerifyAccount /> },
    ],
  },
  {
    path: '/password',
    element: (
      <ProtectLoginRoute>
        <ResetPassword />
      </ProtectLoginRoute>
    ),
    children: [
      { index: true, element: <SetPassword /> },
      { path: 'new', element: <SetNewPassword /> },
      { path: 'success', element: <Success /> },
    ],
  },
];

export default routeAuth;
