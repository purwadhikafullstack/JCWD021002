import { Cart } from "../pages/Cart";
import { Home } from "../pages/home/Home";
import HereGeocodingApp from "../pages/profile/HereGeocodingApp";

const routeHome = [
  {path: "/", element:  <Home />},
  {path: "/cart", element:  <Cart />},
  {path: "/maps", element:  <HereGeocodingApp />},
]

export default routeHome