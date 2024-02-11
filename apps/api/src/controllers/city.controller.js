import { getCityService } from "../services/city.service"

export const getCityController = async (req, res) => {
  try {
    const { cityName, provinceId, cityId } = req.query;
    const result = await getCityService(cityName, provinceId, cityId)

    return res.status(200).json({
      message: "Get city Success",
      data: result
    })
  } catch (err) {
    res.status(500).send(err.message)
  }
}