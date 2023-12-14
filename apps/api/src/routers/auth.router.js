import { Router } from "express";
import { getUserController, registerController, loginController } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.get("/", async (req, res) => {
  await getUserController(req, res);
})

authRouter.post("/register", async (req, res) => {
  await registerController(req, res)
})
authRouter.post("/login", async (req, res) => {
  await loginController(req, res)
})

export { authRouter };