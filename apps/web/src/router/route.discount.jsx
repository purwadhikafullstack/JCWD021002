/* eslint-disable react-refresh/only-export-components */
import AddDiscount from "../pages/AddDiscount/AddDiscount";
import DiscountLists from "../pages/DiscountLists/DiscountLists";
import EditDiscount from "../pages/EditDiscount/EditDiscount";
import DiscountDetail from '../pages/DiscountDetail/DiscountDetail';
import withRoleRestriction from './withRoleRestriction';

const AdminAddDiscountsWithRoleCheck = withRoleRestriction([1, 2])(AddDiscount);
const AdminDiscountListsWithRoleCheck = withRoleRestriction([1, 2])(DiscountLists);
const AdminEditDiscountsWithRoleCheck = withRoleRestriction([1, 2])(EditDiscount);
const AdminDiscountDetailWithRoleCheck = withRoleRestriction([1, 2])(DiscountDetail);

const routeDiscount = [
  {path: '/discount-lists', element: <AdminDiscountListsWithRoleCheck />},
  {path: '/add-discount', element: <AdminAddDiscountsWithRoleCheck />},
  {path: '/edit-discount/:id', element: <AdminEditDiscountsWithRoleCheck />},
  {path: '/discount-detail/:id', element: <AdminDiscountDetailWithRoleCheck />},
]

export default routeDiscount