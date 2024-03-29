import { getProvinceService, createAddressService, getAddressService, changeAddressService, deleteAddressService } from "../services/address.service"

export const getProvinceController = async (req, res) => {
  try {
    const result = await getProvinceService()

    return res.status(200).json({
      message: "Get Province Success",
      data: result
    })
  } catch (err) {
    res.status(500).send(err.message)
  }
}
export const createAddressController = async (req, res) => {
  try {
    const { userId, cityId, isMain } = req.query;
    const {
      addressLine,
      postalCode,
      recipientNames,
      recipientsMobileNumber,
      addressLabel,
      addressDetails,
      latitude,
      longitude,
    } = req.body;

    const result = await createAddressService(
      userId,
      addressLine,
      cityId,
      postalCode,
      recipientNames,
      recipientsMobileNumber,
      addressLabel,
      addressDetails,
      isMain,
      latitude,
      longitude)

    return res.status(200).json({
      message: "Get city Success",
      data: result
    })
  } catch (err) {
    res.status(500).send(err.message)
  }
}
export const changeAddressController = async (req, res) => {
  try {
    const { userId, addressId, cityId, isMain } = req.query;
    const {
      addressLine,
      postalCode,
      recipientNames,
      recipientsMobileNumber,
      addressLabel,
      addressDetails
    } = req.body;

    const result = await changeAddressService(
      userId,
      addressLine,
      cityId,
      postalCode,
      recipientNames,
      recipientsMobileNumber,
      addressLabel,
      addressDetails,
      isMain,
      addressId)

    return res.status(200).json({
      message: "Get city Success",
      data: result
    })
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export const getAddressController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getAddressService(id)

    res.status(200).json({
      message: "Get Address success",
      data: result
    })
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export const deleteAddressController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteAddressService(id)
    return res.status(200).json({
      message: 'delete addrees',
      data: result
    })
  } catch (err) {
    res.status(500).send(err.message)
  }
}