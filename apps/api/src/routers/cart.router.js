import { Router } from 'express';

import {
  createCartController,
  updateItemCartQtyController,
  deleteCartItemController,
  getCartController,
} from '../controllers/cart.controller';
import { verifyToken } from '../middlewares/auth';

const cartRouter = Router();

// POST
cartRouter.post('/', verifyToken, async (req, res) => {
  await createCartController(req, res);
});

// PUT
cartRouter.put('/update/:productId/:newQuantity', verifyToken, async (req, res) => {
  await updateItemCartQtyController(req, res);
});

// DELETE
cartRouter.delete('/delete-product/', verifyToken, async (req, res) => {
  await deleteCartItemController(req, res);
});

// GET
cartRouter.get('/:cityId', verifyToken, async (req, res) => {
  await getCartController(req, res);
});

export { cartRouter };
