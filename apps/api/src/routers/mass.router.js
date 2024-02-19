import { Router } from 'express';
import {
    getPaginatedAndFilteredMassController,
    addMassController,
    editMassController,
    deleteMassController,
} from '../controllers/mass.controller';

const massRouter = Router();

// GET
massRouter.get('/mass-lists', async (req, res) => {
  const result = await getPaginatedAndFilteredMassController(req, res);
  return result;
});

massRouter.post('/add-mass', async (req, res) => {
    const result = await addMassController(req, res);
    return result;
  });

  massRouter.patch('/change-mass', async (req, res) => {
    const result = await editMassController(req, res);
    return result;
  });

  massRouter.delete('/remove-mass/:massId', async (req, res) => {
    const result = await deleteMassController(req, res);
    return result;
  });




export { massRouter };
