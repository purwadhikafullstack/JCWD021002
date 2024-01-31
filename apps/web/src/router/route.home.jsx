import { Cart } from "../pages/Cart";
import { Home } from "../pages/home/Home";
import HereGeocodingApp from "../pages/profile/HereGeocodingApp";

const routeHome = [
<<<<<<< Updated upstream
  {path: "/", element:  <Home />},
  {path: "/cart", element:  <Cart />},
  {path: "/maps", element:  <HereGeocodingApp />},
]
=======
  {
    path: '/',
    element: (
      <ProtectUserRoute>
        <Home />
      </ProtectUserRoute>
    ),
  },
  // {
  //   path: '/cart',
  //   element: (
  //     <ProtectUserRoute>
  //       <Cart />
  //     </ProtectUserRoute>
  //   ),
  // },
  {
    path: '*',
    element: <ErrorPage />,
  },
];
>>>>>>> Stashed changes

export default routeHome