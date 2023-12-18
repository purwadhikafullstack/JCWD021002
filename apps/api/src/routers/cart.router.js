import { Router } from 'express';

import { createCartController } from '../controllers/cart.controller';

const cartRouter = Router();

// POST
cartRouter.post('/', createCartController);

// cartRouter.post('/', async (req, res) => {
//     const result = await createCartController(req, res);
//     res.json(result);
// });

export { cartRouter };
