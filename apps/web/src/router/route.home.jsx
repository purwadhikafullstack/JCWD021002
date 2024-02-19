import { Cart } from "../pages/Cart";
import { Checkout } from "../pages/Checkout";
import ErrorPage from '../error.page';
import { Home } from '../pages/home/Home';
import { ProtectLoggedInUser, ProtectUserRoute } from './protection.route';

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
    path: '/beli-sekarang',
    element: (<ProtectLoggedInUser>
    <ProtectUserRoute>
      <Checkout />,
    </ProtectUserRoute>
  </ProtectLoggedInUser>
  )},
  {
    path: '*',
    element: <ErrorPage />,
  },
];

export default routeHome;
