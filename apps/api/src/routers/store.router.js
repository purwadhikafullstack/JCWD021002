import { Router } from "express";
import { getStoreListController, addStoreController, changeStoreController } from "../controllers/store.controller";

const storeRouter = Router()

storeRouter.get("/list", async (req, res) => {
  const result = await getStoreListController(req, res);
  return result
})
storeRouter.post("/add", async (req, res) => {
  const result = await addStoreController(req, res);
  return result
})
storeRouter.patch("/change", async (req, res) => {
  const result = await changeStoreController(req, res);
  return result
})

export { storeRouter }