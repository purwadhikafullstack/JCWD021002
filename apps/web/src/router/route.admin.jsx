import AddUser from "../pages/AddUser/AddUser";
import EditUser from "../pages/EditUser/EditUser";
import UserDetail from "../pages/UserDetail/UserDetail";
import UserLists from "../pages/UserLists/UserLists";
import Store from "../pages/store";
import { StoreList } from '../pages/store/storeList';
import withRoleRestriction from './withRoleRestriction';

const AdminUserListsWithRoleCheck = withRoleRestriction([1])(UserLists);
const AdminEditUsersWithRoleCheck = withRoleRestriction([1])(EditUser);
const AdminAddUsersWithRoleCheck = withRoleRestriction([1])(AddUser);
const AdminUserDetailsWithRoleCheck = withRoleRestriction([1])(UserDetail);
const AdminStoresWithRoleCheck = withRoleRestriction([1])(Store);


const routeAdmin = [
  { path: '/user-lists', element: <AdminUserListsWithRoleCheck /> },
  { path: '/detail-user/:id', element: <AdminUserDetailsWithRoleCheck /> },
  { path: '/add-user', element: <AdminAddUsersWithRoleCheck /> },
  { path: '/edit-user/:id', element: <AdminEditUsersWithRoleCheck /> },
  // { path: '/store-management', element: <AdminStoresWithRoleCheck /> },
  {
    path: '/store',
    element: <Store />,
    children: [{ index: true, element: <StoreList /> }],
  },
];

export default routeAdmin;
