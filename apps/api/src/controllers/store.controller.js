import { getStoreListService, addStoreService, changeStoreService } from "../services/store.service"

export const getStoreListController = async (req, res) => {
  try {
    const result = await getStoreListService()

    res.status(200).json({
      message: "get store success",
      data: result
    })
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export const addStoreController = async (req, res) => {
  try {
    const { storeName } = req.body;
    const { cityId } = req.query;
    const result = await addStoreService(storeName, cityId)
    res.status(200).json({
      message: "get store success",
      data: result
    })
  } catch (err) {
    res.status(500).send(err.message)
  }
}
export const changeStoreController = async (req, res) => {
  try {
    const { name } = req.body;
    const { storeId, cityId } = req.query;
    const result = await changeStoreService(storeId, name, cityId)
    res.status(200).json({
      message: "get store success",
      data: result
    })
  } catch (err) {
    res.status(500).send(err.message)
  }
}