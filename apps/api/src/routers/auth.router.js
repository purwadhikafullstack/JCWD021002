import { Router } from 'express';
import {
  getUserController,
  registerController,
  loginController,
  setPasswordController,
  loginWithSocialController,
  registerWithSocialController
} from '../controllers/auth.controller';
import { registerWithSocialService } from '../services/auth.service';

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

authRouter.patch('/setPassword', async (req, res) => {
  await setPasswordController(req, res);
});

export { authRouter };
