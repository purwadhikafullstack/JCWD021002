import AddUser from '../pages/AddUser/AddUser';
import EditUser from '../pages/EditUser/EditUser';
import UserDetail from '../pages/UserDetail/UserDetail';
import UserLists from '../pages/UserLists/UserLists';
import Store from '../pages/store';
import { StoreList } from '../pages/store/storeList';
import {
  ProtectAdminRoute,
  ProtectLoggedInUser,
  ProtectSuperAdminRoute,
} from './protection.route';

const routeAdmin = [
  {
    path: '/user-lists',
    element: (
      <ProtectLoggedInUser>
        <ProtectAdminRoute>
          <UserLists />
        </ProtectAdminRoute>
      </ProtectLoggedInUser>
    ),
  },
  {
    path: '/detail-user/:id',
    element: (
      <ProtectLoggedInUser>
        <ProtectAdminRoute>
          <UserDetail />
        </ProtectAdminRoute>
      </ProtectLoggedInUser>
    ),
  },
  {
    path: '/add-user',
    element: (
      <ProtectLoggedInUser>
        <ProtectAdminRoute>
          <AddUser />
        </ProtectAdminRoute>
      </ProtectLoggedInUser>
    ),
  },
  { path: '/edit-user/:id', element: <EditUser /> },
  {
    path: '/store',
    element: (
      <ProtectLoggedInUser>
        <ProtectSuperAdminRoute>
          <Store />
        </ProtectSuperAdminRoute>
      </ProtectLoggedInUser>
    ),
    children: [{ index: true, element: <StoreList /> }],
  },
];

export default routeAdmin;
