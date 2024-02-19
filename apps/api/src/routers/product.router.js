import { Router } from 'express';
import {
    getPaginatedAndFilteredProductsController,
    getPaginatedAndFilteredProductsRealController,
    getDetailProductController,
    addProductController,
    softDeleteProductController,
    updateProductController,
    getDetailProductRealController,
    deleteProductImageController,
    deleteProductImageFromFolderController,
} from '../controllers/product.controller';
import { addProductStockController } from '../controllers/productStock.controller';
import {
  uploadProductFile
} from '../middlewares/multerConfig';
import { verifyToken } from '../middlewares/auth';

const productRouter = Router();

// GET
productRouter.get('/product-lists', async (req, res) => {
  const result = await getPaginatedAndFilteredProductsController(req, res);
  return result;
});

productRouter.get('/product-lists-v2', async (req, res) => {
  const result = await getPaginatedAndFilteredProductsRealController(req, res);
  return result;
});

productRouter.get('/product-detail/:id', async (req, res) => {
  const result = await getDetailProductController(req, res);
  return result;
});

productRouter.get('/product-detail-v2/:id', async (req, res) => {
  const result = await getDetailProductRealController(req, res);
  return result;
});

productRouter.patch('/update-product', verifyToken, uploadProductFile, async (req, res) => {
  const result = await updateProductController(req, res);
  return result;
});

productRouter.patch('/product-soft-delete/:id', async (req, res) => {
  const result = await softDeleteProductController(req, res);
  return result;
});



productRouter.post('/add-product', 
verifyToken,
uploadProductFile, async (req, res) => {
  const result = await addProductController(req, res);
  return result;
});

productRouter.delete('/delete-product-image', async (req, res) => {
  const result = await deleteProductImageController(req, res);
  return result;
});

export { productRouter };
