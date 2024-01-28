import AddUser from '../pages/AddUser/AddUser';
import EditUser from '../pages/EditUser/EditUser';
import UserDetail from '../pages/UserDetail/UserDetail';
import UserLists from '../pages/UserLists/UserLists';
import Store from '../pages/store';
import { StoreList } from '../pages/store/storeList';

const routeAdmin = [
  { path: '/user-lists', element: <UserLists /> },
  { path: '/detail-user/:id', element: <UserDetail /> },
  { path: '/add-user', element: <AddUser /> },
  { path: '/edit-user/:id', element: <EditUser /> },
  {
    path: '/store',
    element: <Store />,
    children: [{ index: true, element: <StoreList /> }],
  },
];

export default routeAdmin;