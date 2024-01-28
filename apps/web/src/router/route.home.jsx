import ErrorPage from '../error.page';
import { Cart } from '../pages/Cart';
import { Home } from '../pages/home/Home';
import { ProtectUserRoute } from './protection.route';

const routeHome = [
  {
    path: '/',
    element: (
      <ProtectUserRoute>
        <Home />
      </ProtectUserRoute>
    ),
  },
  {
    path: '/cart',
    element: (
      <ProtectUserRoute>
        <Cart />
      </ProtectUserRoute>
    ),
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
];

export default routeHome;
