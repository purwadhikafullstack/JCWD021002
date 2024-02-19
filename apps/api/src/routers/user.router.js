import { Router } from 'express';
import {
  getUserDetailController,
  addUserController,
  getUserController,
  updateUserController,
  getStoreController,
  deleteUserController,
  getStoreListsController,
} from '../controllers/user.controller';
import {
  uploadAvatarFile
} from '../middlewares/multerConfig';

const userRouter = Router();

// GET
userRouter.get('/user-lists', async (req, res) => {
  const result = await getUserController(req, res);
  return result;
});

// POST
userRouter.patch('/update-user', uploadAvatarFile, async (req, res) => {
  const result = await updateUserController(req, res);
  return result;
});

// GET
userRouter.get('/user-detail/:id', async (req, res) => {
  const result = await getUserDetailController(req, res);
  return result;
});

// GET
userRouter.post('/add-user', uploadAvatarFile, async (req, res) => {
  const result = await addUserController(req, res);
  return result;
});

userRouter.get('/store-lists', async (req, res) => {
  const result = await getStoreController(req, res);
  return result;
});
userRouter.patch('/delete/:id', async (req, res) => {
  const result = await deleteUserController(req, res);
  return result;
});
userRouter.get('/get-all-store', async (req, res) => {
  const result = await getStoreListsController(req, res);
  return result;
});


export { userRouter };
