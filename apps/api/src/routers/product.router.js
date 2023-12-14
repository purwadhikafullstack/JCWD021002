import { Router } from 'express';
import {
    getPaginatedAndFilteredProductsController
} from '../controllers/product.controller';

const productRouter = Router();

// GET
productRouter.get('/product-lists', async (req, res) => {
  const result = await getPaginatedAndFilteredProductsController(req, res);
  res.json(result);
});

export { productRouter };
