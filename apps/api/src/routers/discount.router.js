import { Router } from 'express';
import {
  addDiscountController,
  getPaginatedAndFilteredDiscountController,
  getDetailDiscountController,
  updatedDiscountController,
} from '../controllers/discount.controller';
import {
  uploadDiscountFile
} from '../middlewares/multerConfig';
import { verifyToken } from '../middlewares/auth';

const discountRouter = Router();

// GET
discountRouter.get('/discount-lists', async (req, res) => {
  const result = await getPaginatedAndFilteredDiscountController(req, res);
  return result;
});

// GET
discountRouter.get('/discount-detail/:id', async (req, res) => {
  const result = await getDetailDiscountController(req, res);
  return result;
});

// POST
discountRouter.post('/add-discount', verifyToken, uploadDiscountFile, async (req, res) => {
  const result = await addDiscountController(req, res);
  return result;
});

// POST
discountRouter.patch('/edit-discount', verifyToken, uploadDiscountFile, async (req, res) => {
  const result = await updatedDiscountController(req, res);
  return result;
});

export { discountRouter };
