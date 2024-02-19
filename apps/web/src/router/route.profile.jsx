import { ProtectUserRoute, ProtectLoggedInUser } from './protection.route';
import { Profile } from '../pages/profile';
import { ChangeEmail } from '../pages/profile/changeEmail';
import { ChangeEmailVerfy } from '../components/varifikasiEmail/emailVerify';
import { ChangePassword } from '../pages/profile/changePassword';
import { Detail } from '../pages/profile/detail';
import { EditProfile } from '../pages/profile/editProfile';
import { MyAccount } from '../pages/profile/myAccount';
import { ProfileMenu } from '../pages/profile/profileMenu';
import { AddAddress } from '../pages/Address/addAddress';
import { AddressList } from '../pages/Address/addressList';
import { MyAddress } from '../pages/Address/myAddress';

const routeProfile = [
  {
    path: '/profile',
    element: (
      <ProtectLoggedInUser>
        <ProtectUserRoute>
          <Profile />
        </ProtectUserRoute>
      </ProtectLoggedInUser>
    ),
    children: [
      { index: true, element: <ProfileMenu /> },
      { path: 'detail', element: <Detail /> },
    ],
  },
  {
    path: '/profile/detail/account',
    element: (
      <ProtectLoggedInUser>
        <ProtectUserRoute>
          <MyAccount />
        </ProtectUserRoute>
      </ProtectLoggedInUser>
    ),
  },
  {
    path: '/profile/detail/account/edit-profile',
    element: (
      <ProtectLoggedInUser>
        <ProtectUserRoute>
          <EditProfile />
        </ProtectUserRoute>
      </ProtectLoggedInUser>
    ),
  },
  {
    path: '/profile/detail/account/email-verification',
    element: (
      <ProtectLoggedInUser>
        <ProtectUserRoute>
          <ChangeEmailVerfy />
        </ProtectUserRoute>
      </ProtectLoggedInUser>
    ),
  },
  {
    path: '/profile/detail/account/change-email',
    element: (
      <ProtectLoggedInUser>
        <ProtectUserRoute>
          <ChangeEmail />
        </ProtectUserRoute>
      </ProtectLoggedInUser>
    ),
  },
  {
    path: '/profile/detail/account/change-password',
    element: (
      <ProtectLoggedInUser>
        <ProtectUserRoute>
          <ChangePassword />
        </ProtectUserRoute>
      </ProtectLoggedInUser>
    ),
  },
  {
    path: '/profile/detail/address',
    element: (
      <ProtectLoggedInUser>
        <ProtectUserRoute>
          <MyAddress />
        </ProtectUserRoute>
      </ProtectLoggedInUser>
    ),
    children: [
      { index: true, element: <AddressList /> },
      { path: 'add', element: <AddAddress /> },
    ],
  },
];

export default routeProfile;
