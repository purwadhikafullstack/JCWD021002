import { Router } from 'express';
import {
    getPaginatedAndFilteredCategoryController,
    addCategoryController,
    editCategoryController,
    deleteCategoryController,
    deleteCategoryForProductController,
} from '../controllers/category.controller';

const categoryRouter = Router();

// GET
categoryRouter.get('/category-lists', async (req, res) => {
  const result = await getPaginatedAndFilteredCategoryController(req, res);
  return result;
});

categoryRouter.post('/add-category', async (req, res) => {
    const result = await addCategoryController(req, res);
    return result;
  });

  categoryRouter.patch('/change-category', async (req, res) => {
    const result = await editCategoryController(req, res);
    return result;
  });

  categoryRouter.delete('/remove-category/:category_id', async (req, res) => {
    const result = await deleteCategoryController(req, res);
    return result;
  });

  categoryRouter.delete('/remove-category-product', async (req, res) => {
    const result = await deleteCategoryForProductController(req, res);
    return result;
  });

// productRouter.get('/product-detail/:id', async (req, res) => {
//   const result = await getDetailProductController(req, res);
//   return result;
// });

export { categoryRouter };
