import { Cart } from '../pages/Cart';
import { Checkout } from '../pages/Checkout';
import { ProtectLoggedInUser, ProtectUserRoute } from './protection.route';

const routeCart = [
  {
    path: '/cart',
    element: <Cart />,
    // children: [
    //     { path: 'shipment', element: <Checkout /> },
    //   ],
  },
  {
    path: '/cart/shipment',
    element:(<ProtectLoggedInUser>
      <ProtectUserRoute>
        <Checkout />,
      </ProtectUserRoute>
    </ProtectLoggedInUser>
    )},
];

export default routeCart;