import { Cart } from '../pages/Cart';
// import { Checkout } from '../pages/Checkout';

const routeCart = [
  {
    path: '/cart',
    element: <Cart />,
    // children: [
    //     { path: 'shipment', element: <Checkout /> },
    //   ],
  },
//   {
//     path: '/cart/shipment',
//     element: <Checkout />,
//     // children: [
//     //     { path: 'shipment', element: <Checkout /> },
//     //   ],
//   },
];

export default routeCart;