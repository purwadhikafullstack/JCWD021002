import { getProvinceQuery, getCityQuery } from "../queries/address.query"

export const getProvinceService = async () => {
  try {
    const res = await getProvinceQuery()
    return res
  } catch (err) {
    throw err
  }
}
export const getCityService = async (id) => {
  try {
    const res = await getCityQuery(id)
    return res
  } catch (err) {
    throw err
  }
}