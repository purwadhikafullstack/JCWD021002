import { Router } from "express";
import { getUserController } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.get("/", async (req, res) => {
  const result = await getUserController();
  res.json(result)
})

export { authRouter };