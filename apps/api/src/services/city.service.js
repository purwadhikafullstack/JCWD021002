import { getCityQuery } from "../queries/city.query"

export const getCityService = async (cityName, provinceId, cityId) => {
  try {
    const res = await getCityQuery(cityName, provinceId, cityId)
    return res
  } catch (err) {
    throw err
  }
}