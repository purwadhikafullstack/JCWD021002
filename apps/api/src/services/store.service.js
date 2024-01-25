import { getStoreListQuery, addStoreQuery, changeStoreQuery } from "../queries/store.query"

export const getStoreListService = async () => {
  try {
    const res = await getStoreListQuery()

    return res
  } catch (err) {
    throw err
  }
}
export const addStoreService = async (storeName, cityId) => {
  try {
    const res = await addStoreQuery(storeName, cityId)

    return res
  } catch (err) {
    throw err
  }
}
export const changeStoreService = async (storeId, name, cityId) => {
  try {
    const res = await changeStoreQuery(storeId, name, cityId)

    return res
  } catch (err) {
    throw err
  }
}