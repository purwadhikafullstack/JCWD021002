import AddDiscount from "../pages/AddDiscount/AddDiscount";
import DiscountLists from "../pages/DiscountLists/DiscountLists";
import EditDiscount from "../pages/EditDiscount/EditDiscount";

const routeDiscount = [
  {path: '/discount-lists', element: <DiscountLists />},
  {path: '/add-discount', element: <AddDiscount />},
  {path: '/edit-discount/:id', element: <EditDiscount />},

]

export default routeDiscount