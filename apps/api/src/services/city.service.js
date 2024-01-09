import { getCityQuery } from "../queries/city.query"

export const getCityService = async (cityName) => {
  try {
    const res = await getCityQuery(cityName)
    return res
  } catch (err) {
    throw err
  }
}