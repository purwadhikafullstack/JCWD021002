import { Router } from 'express';
import {
    getPaginatedAndFilteredPackagingController,
    addPackagingController,
    editPackagingController,
    deletePackagingController,
} from '../controllers/packaging.controller';

const packagingRouter = Router();

// GET
packagingRouter.get('/packaging-lists', async (req, res) => {
  const result = await getPaginatedAndFilteredPackagingController(req, res);
  return result;
});

packagingRouter.post('/add-packaging', async (req, res) => {
    const result = await addPackagingController(req, res);
    return result;
  });

  packagingRouter.patch('/change-packaging', async (req, res) => {
    const result = await editPackagingController(req, res);
    return result;
  });

  packagingRouter.delete('/remove-packaging/:packagingId', async (req, res) => {
    const result = await deletePackagingController(req, res);
    return result;
  });




export { packagingRouter };
