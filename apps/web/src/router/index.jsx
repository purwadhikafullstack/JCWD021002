// import routeProfile from './route.profile';
import routeAuth from './route.auth';
import routeAdminProduct from './route.admin.product';
// import routeAdmin from './route.admin';
// import routeDiscount from './route.discount';
import routeHome from './route.home';
import routeCart from './route.cart';

const routesConfiq = [
  ...routeHome,
  ...routeAuth,
  // ...routeProfile,
  ...routeAdminProduct,
  // ...routeAdmin,
  // ...routeDiscount,
  ...routeCart,
];

export default routesConfiq