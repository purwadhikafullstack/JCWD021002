import { LoggedInUser } from './protection.route';
import { Profile } from '../pages/profile';
import { ChangeEmail } from '../pages/profile/changeEmail';
import { ChangeEmailVerfy } from '../pages/profile/changeEmailVerify';
import { ChangePassword } from '../pages/profile/changePassword';
import { Detail } from '../pages/profile/detail';
import { EditProfile } from '../pages/profile/editProfile';
import { MyAccount } from '../pages/profile/myAccount';
import { MyAddress } from '../pages/profile/myAddress';
import { ProfileMenu } from '../pages/profile/profileMenu';

const routeProfile = [
  {
    path: '/profile',
    element: (
      <LoggedInUser>
        <Profile />
      </LoggedInUser>
    ),
    children: [
      { index: true, element: <ProfileMenu /> },
      { path: 'detail', element: <Detail /> },
    ],
  },
  {
    path: '/profile/detail/account',
    element: (
      <LoggedInUser>
        <MyAccount />
      </LoggedInUser>
    ),
  },
  {
    path: '/profile/detail/account/edit-profile',
    element: (
      <LoggedInUser>
        <EditProfile />
      </LoggedInUser>
    ),
  },
  {
    path: '/profile/detail/account/email-verification',
    element: (
      <LoggedInUser>
        <ChangeEmailVerfy />
      </LoggedInUser>
    ),
  },
  {
    path: '/profile/detail/account/change-email',
    element: (
      <LoggedInUser>
        <ChangeEmail />
      </LoggedInUser>
    ),
  },
  {
    path: '/profile/detail/account/change-password',
    element: (
      <LoggedInUser>
        <ChangePassword />
      </LoggedInUser>
    ),
  },
  {
    path: '/profile/detail/address',
    element: (
      <LoggedInUser>
        <MyAddress />
      </LoggedInUser>
    ),
  },
];

export default routeProfile;
