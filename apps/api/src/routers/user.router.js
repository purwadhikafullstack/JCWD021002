import { Router } from 'express';
import {
  getUserDetailController,
  addUserController,
  getUserController,
  updateUserController,
} from '../controllers/user.controller';

const userRouter = Router();

// GET
userRouter.get('/user-lists', async (req, res) => {
  const result = await getUserController(req, res);
  return result;
});

// POST
userRouter.patch('/update-user', async (req, res) => {
  const result = await updateUserController();
  return result;
});

// GET
userRouter.get('/user-detail/:id', async (req, res) => {
  const result = await getUserDetailController(req, res);
  return result;
});

// GET
userRouter.post('/add-user', async (req, res) => {
  const result = await addUserController(req, res);
  return result;
});

export { userRouter };
