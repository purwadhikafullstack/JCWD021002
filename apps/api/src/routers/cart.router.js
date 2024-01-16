import { Router } from 'express';

import {
  createCartController,
  updateItemCartQtyController,
  deleteCartItemController,
} from '../controllers/cart.controller';

const cartRouter = Router();

// POST
cartRouter.post('/', async (req, res) => {
  await createCartController(req, res);
});

// PUT
cartRouter.put('/update/:userId/:productId/:newQuantity', async (req, res) => {
  await updateItemCartQtyController(req, res);
});

// DELETE
cartRouter.delete('/delete-product/:userId/:productId', async (req, res) => {
  await deleteCartItemController(req, res);
});

export { cartRouter };
