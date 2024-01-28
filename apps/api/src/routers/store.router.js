import { Router } from "express";
import { getStoreListController, getStoreController, addStoreController, changeStoreController, deleteStoreController } from "../controllers/store.controller";
const { check, validationResult } = require('express-validator');

const validateSearchInput = [
  check('query').matches(/^[a-zA-Z0-9\s]*$/).withMessage('Input Tidak Valid'),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      console.log(error.array())
      return res.status(400).json({ error: error.array() })
    }
    next()
  }
]

const storeRouter = Router()

storeRouter.get("/", async (req, res) => {
  const result = await getStoreController(req, res);
  return result
})
storeRouter.get("/list", validateSearchInput, async (req, res) => {
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
storeRouter.patch("/delete", async (req, res) => {
  const result = await deleteStoreController(req, res);
  return result
})

export { storeRouter }