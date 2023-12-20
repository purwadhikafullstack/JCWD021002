import { Router } from 'express';

import {
  createCartController,
} from '../controllers/cart.controller';

const cartRouter = Router();

// POST
cartRouter.post('/', async (req, res) => {
  await createCartController(req, res);
});

export { cartRouter };
