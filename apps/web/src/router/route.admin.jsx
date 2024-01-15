import AddUser from "../pages/AddUser/AddUser";
import EditUser from "../pages/EditUser/EditUser";
import UserDetail from "../pages/UserDetail/UserDetail";
import UserLists from "../pages/UserLists/UserLists";
import Store from "../pages/store";

const routeAdmin = [
  { path: '/user-lists', element: <UserLists /> },
  { path: '/detail-user/:id', element: <UserDetail /> },
  { path: '/add-user', element: <AddUser /> },
  { path: '/edit-user/:id', element: <EditUser /> },
  { path: '/store-management', element: <Store /> },

];

export default routeAdmin