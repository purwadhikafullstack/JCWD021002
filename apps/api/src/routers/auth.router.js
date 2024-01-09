import { Router } from 'express';
import {
  getUserController,
  registerController,
  loginController,
  setPasswordController,
  loginWithSocialController,
  registerWithSocialController,
  keepLoginController,
  changePasswordController,
  changeEmailController,
  changeEmailVerifyController,
  updateProfileController
} from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/auth';
import { uploadAvatarFile } from '../middlewares/multerConfig';

const authRouter = Router();

authRouter.get('/', async (req, res) => {
  await getUserController(req, res);
});

authRouter.post('/register', async (req, res) => {
  await registerController(req, res);
});

authRouter.post('/login', async (req, res) => {
  await loginController(req, res);
});

authRouter.post('/loginsocial', async (req, res) => {
  await loginWithSocialController(req, res);
});

authRouter.post('/registersocial', async (req, res) => {
  await registerWithSocialController(req, res);
});

authRouter.get('/keepLogin', verifyToken, keepLoginController);

authRouter.patch('/setPassword', async (req, res) => {
  await setPasswordController(req, res);
});

authRouter.patch('/change-password/:id', async (req, res) => {
  await changePasswordController(req, res);
});
authRouter.patch('/change-email/:id', async (req, res) => {
  await changeEmailController(req, res);
});
authRouter.post('/change-email-verification/:id', async (req, res) => {
  await changeEmailVerifyController(req, res);
});
authRouter.patch('/update-profile/:id', uploadAvatarFile, updateProfileController);

export { authRouter };
