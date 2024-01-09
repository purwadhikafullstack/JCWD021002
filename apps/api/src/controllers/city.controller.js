import { getCityService } from "../services/city.service"

export const getCityController = async (req, res) => {
  try {
    const { cityName } = req.query;
    const result = await getCityService(cityName)

    return res.status(200).json({
      message: "Get city Success",
      data: result
    })
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
}