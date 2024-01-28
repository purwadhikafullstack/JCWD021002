import AddProduct from '../pages/AddProduct/AddProduct';
import AddProductStock from '../pages/AddProductStock/AddProductStock';
import CategoryLists from '../pages/CategoryLists/CategoryLists';
import EditProduct from '../pages/EditProduct/EditProduct';
import MassLists from '../pages/MassLists/MassLists';
import PackagingLists from '../pages/PackagingLists/PackagingLists';
import ProductDetail from '../pages/ProductDetail/Product';
import ProductDetailAdmin from '../pages/ProductDetailAdmin/ProductDetailAdmin';
import ProductLists from '../pages/ProductLists/ProductLists';
import ProductStockLists from '../pages/ProductStockLists/ProductStockLists';
import ProductSearch from '../pages/ProductSearch/ProductSearch';
import { ProtectAdminRoute, ProtectLoggedInUser } from './protection.route';

const routeAdminProduct = [
  {
    path: '/product-detail/:id',
    element: (
      <ProtectLoggedInUser>
        <ProtectAdminRoute>
          <ProductDetail />
        </ProtectAdminRoute>
      </ProtectLoggedInUser>
    ),
  },
  {
    path: '/product-search',
    element: (
      <ProtectLoggedInUser>
        <ProtectAdminRoute>
          <ProductSearch />
        </ProtectAdminRoute>
      </ProtectLoggedInUser>
    ),
  },
  {
    path: '/product-lists',
    element: (
      <ProtectLoggedInUser>
        <ProtectAdminRoute>
          <ProductLists />
        </ProtectAdminRoute>
      </ProtectLoggedInUser>
    ),
  },
  {
    path: '/category-lists',
    element: (
      <ProtectLoggedInUser>
        <ProtectAdminRoute>
          <CategoryLists />
        </ProtectAdminRoute>
      </ProtectLoggedInUser>
    ),
  },
  {
    path: '/add-product',
    element: (
      <ProtectLoggedInUser>
        <ProtectAdminRoute>
          <AddProduct />
        </ProtectAdminRoute>
      </ProtectLoggedInUser>
    ),
  },
  {
    path: '/edit-product/:id',
    element: (
      <ProtectLoggedInUser>
        <ProtectAdminRoute>
          <EditProduct />
        </ProtectAdminRoute>
      </ProtectLoggedInUser>
    ),
  },
  {
    path: '/product-detail-admin/:id',
    element: (
      <ProtectLoggedInUser>
        <ProtectAdminRoute>
          <ProductDetailAdmin />
        </ProtectAdminRoute>
      </ProtectLoggedInUser>
    ),
  },
  {
    path: '/mass-lists',
    element: (
      <ProtectLoggedInUser>
        <ProtectAdminRoute>
          <MassLists />
        </ProtectAdminRoute>
      </ProtectLoggedInUser>
    ),
  },
  {
    path: '/packaging-lists',
    element: (
      <ProtectLoggedInUser>
        <ProtectAdminRoute>
          <PackagingLists />
        </ProtectAdminRoute>
      </ProtectLoggedInUser>
    ),
  },
  {
    path: '/add-product-stock/:productId',
    element: (
      <ProtectLoggedInUser>
        <ProtectAdminRoute>
          <AddProductStock />
        </ProtectAdminRoute>
      </ProtectLoggedInUser>
    ),
  },
  {
    path: '/product-stock-lists',
    element: (
      <ProtectLoggedInUser>
        <ProtectAdminRoute>
          <ProductStockLists />
        </ProtectAdminRoute>
      </ProtectLoggedInUser>
    ),
  },
];

export default routeAdminProduct;
