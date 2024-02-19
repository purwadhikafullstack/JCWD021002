import routeProfile from './route.profile';
import routeAuth from './route.auth';
import routeAdminProduct from './route.admin.product';
import routeAdmin from './route.admin';
import routeDiscount from './route.discount';
import routeHome from './route.home';
import routeCart from './route.cart';
import routeTransaction from './route.transaction';

const routesConfiq = [
  ...routeHome,
  ...routeAuth,
  ...routeProfile,
  ...routeAdminProduct,
  ...routeAdmin,
  ...routeDiscount,
  ...routeCart,
  ...routeTransaction,
];

export default routesConfiq
