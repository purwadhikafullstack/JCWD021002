/* eslint-disable react-refresh/only-export-components */
import DashboardAdmin from '../pages/DashboardAdmin/DashboardAdmin';
import AddProduct from '../pages/AddProduct/AddProduct';
import CategoryLists from '../pages/CategoryLists/CategoryLists';
import EditProduct from '../pages/EditProduct/EditProduct';
import MassLists from '../pages/MassLists/MassLists';
import PackagingLists from '../pages/PackagingLists/PackagingLists';
import ProductDetail from '../pages/ProductDetail/Product';
import ProductDetailAdmin from '../pages/ProductDetailAdmin/ProductDetailAdmin';
import ProductLists from '../pages/ProductLists/ProductLists';
import ProductStockLists from '../pages/ProductStockLists/ProductStockLists';
import ProductSearch from '../pages/ProductSearch/ProductSearch';
import ProductCatalogue from '../pages/ProductCatalogue/ProductCatalogue';
import ReportSales from '../pages/ReportSales/ReportSales';
import ReportStock from '../pages/ReportStock/ReportStock';
import withRoleRestriction from './withRoleRestriction';
import { OrderManagement } from '../pages/DashboardAdmin/OrderManagement';

const AdminDashboardWithRoleCheck = withRoleRestriction([1, 2])(DashboardAdmin);
const AdminAddProductsWithRoleCheck = withRoleRestriction([1, 2])(AddProduct);
const AdminCategoryListsWithRoleCheck = withRoleRestriction([1, 2])(CategoryLists);
const AdminEditProductsWithRoleCheck = withRoleRestriction([1, 2])(EditProduct);
const AdminMassListsWithRoleCheck = withRoleRestriction([1, 2])(MassLists);
const AdminPackagingListsWithRoleCheck = withRoleRestriction([1, 2])(PackagingLists);
const AdminProductDetailsAdminWithRoleCheck = withRoleRestriction([1, 2])(ProductDetailAdmin);
const AdminProductListsWithRoleCheck = withRoleRestriction([1, 2])(ProductLists);
const AdminProductStockListsWithRoleCheck = withRoleRestriction([1, 2])(ProductStockLists);
const AdminReportSalesWithRoleCheck = withRoleRestriction([1, 2])(ReportSales);
const AdminReportStockWithRoleCheck = withRoleRestriction([1, 2])(ReportStock);
const AdminOrderManagementWithRoleCheck = withRoleRestriction([1, 2])(OrderManagement);


const routeAdminProduct = [
  { path: '/product-detail/:id', element: <ProductDetail /> },
  { path: '/product-search', element: <ProductSearch /> },
  { path: '/product-catalogue', element: <ProductCatalogue /> },
  { path: '/dashboard', element: <AdminDashboardWithRoleCheck /> },
  { path: '/product-lists', element: <AdminProductListsWithRoleCheck /> },
  { path: '/category-lists', element: <AdminCategoryListsWithRoleCheck /> },
  { path: '/add-product', element: <AdminAddProductsWithRoleCheck /> },
  { path: '/edit-product/:id', element: <AdminEditProductsWithRoleCheck /> },
  { path: '/product-detail-admin/:id', element: <AdminProductDetailsAdminWithRoleCheck /> },
  { path: '/mass-lists', element: <AdminMassListsWithRoleCheck /> },
  { path: '/packaging-lists', element: <AdminPackagingListsWithRoleCheck /> },
  { path: '/product-stock-lists', element: <AdminProductStockListsWithRoleCheck /> },
  { path: '/sales-report', element: <AdminReportSalesWithRoleCheck /> },
  { path: '/stock-report', element: <AdminReportStockWithRoleCheck /> },
  { path: '/order-management', element: <AdminOrderManagementWithRoleCheck /> },
];

export default routeAdminProduct;
