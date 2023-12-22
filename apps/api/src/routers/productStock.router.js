import { Router } from 'express';
import {
    addProductStockController,
    editStockController,
} from '../controllers/productStock.controller';

const productStockRouter = Router();


productStockRouter.post('/add-product-stock', async (req, res) => {
  const result = await addProductStockController(req, res);
  return result;
});

productStockRouter.patch('/edit-product-stock', async (req, res) => {
    const result = await editStockController(req, res);
    return result;
  });


export { productStockRouter };
