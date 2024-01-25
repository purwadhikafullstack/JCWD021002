import Store from "../models/store.model";
import City from "../models/city.model"
import Province from "../models/province.model";

export const getStoreListQuery = async () => {
  try {
    const res = await Store.findAll({ include: [{ model: City, include: [{ model: Province }] }] })
    console.log(res)
    return res
  } catch (err) {
    throw err
  }
}

export const addStoreQuery = async (storeName, cityId) => {
  try {
    const res = await Store.create({
      name: storeName,
      city_idcity: cityId,
      latitude: 1,
      longitude: 1
    })
    return res
  } catch (err) {
    throw err
  }
}
export const changeStoreQuery = async (storeId, name, cityId) => {
  try {
    const res = await Store.update({
      name: name,
      city_idcity: cityId
    }, { where: { id: storeId } })
    return res
  } catch (err) {
    throw err
  }
}