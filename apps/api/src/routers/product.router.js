import { Router } from 'express';
import {
    getPaginatedAndFilteredProductsController,
    getDetailProductController,
    addProductController,
    softDeleteProductController,
    updateProductController,
} from '../controllers/product.controller';
import { addProductStockController } from '../controllers/productStock.controller';
import {
  uploadProductFile
} from '../middlewares/multerConfig';

const productRouter = Router();

// GET
productRouter.get('/product-lists', async (req, res) => {
  const result = await getPaginatedAndFilteredProductsController(req, res);
  return result;
});

productRouter.get('/product-detail/:id', async (req, res) => {
  const result = await getDetailProductController(req, res);
  return result;
});

productRouter.patch('/update-product', uploadProductFile, async (req, res) => {
  const result = await updateProductController(req, res);
  return result;
});

productRouter.patch('/product-soft-delete/:id', async (req, res) => {
  const result = await softDeleteProductController(req, res);
  return result;
});



productRouter.post('/add-product',

// (req, res, next) => {
//   console.log('Request Body:', req.body);
//   next();
// }, 

uploadProductFile, async (req, res) => {
  console.log("ini di router",req.body);
  const result = await addProductController(req, res);
  return result;
});

export { productRouter };
