import { Router } from 'express';
import {
  addDiscountController,
  getPaginatedAndFilteredDiscountController,
  editDiscountController,
  getDetailDiscountController,
} from '../controllers/discount.controller';
import {
  uploadDiscountFile
} from '../middlewares/multerConfig';

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
discountRouter.post('/add-discount', uploadDiscountFile, async (req, res) => {
  const result = await addDiscountController(req, res);
  return result;
});

// POST
discountRouter.patch('/edit-discount', uploadDiscountFile, async (req, res) => {
  const result = await editDiscountController(req, res);
  return result;
});

export { discountRouter };
