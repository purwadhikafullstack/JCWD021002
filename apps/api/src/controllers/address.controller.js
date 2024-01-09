import { getProvinceService, getCityService } from "../services/address.service"

export const getProvinceController = async (req, res) => {
  try {
    const result = await getProvinceService()

    return res.status(200).json({
      message: "Get Province Success",
      data: result
    })
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
}
export const getCityController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getCityService(id)

    return res.status(200).json({
      message: "Get city Success",
      data: result
    })
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
}
export const createAddressController = async (req, res) => {
  try {
    const {
      userId,
      addressLine,
      cityId,
      postalCode,
      recipientNames,
      recipientsMobileNumber,
      addressLabel,
      addressDetails,
      isMain
    } = req.body;

    const result = await getCityService(
      userId,
      addressLine,
      cityId,
      postalCode,
      recipientNames,
      recipientsMobileNumber,
      addressLabel,
      addressDetails,
      isMain)

    return res.status(200).json({
      message: "Get city Success",
      data: result
    })
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
}