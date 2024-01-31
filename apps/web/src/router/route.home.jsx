import { Cart } from "../pages/Cart";
import { Checkout } from "../pages/Checkout";
import { Home } from "../pages/home/Home";
// import HereGeocodingApp from "../pages/profile/HereGeocodingApp";

const routeHome = [
  {path: "/", element:  <Home />},
  {path: "/cart", element:  <Cart />},
//   {path: "/maps", element:  <HereGeocodingApp />},
{
  path: '/beli-sekarang',
  element: <Checkout />,
},
]

export default routeHome