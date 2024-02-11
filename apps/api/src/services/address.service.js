import {
  getProvinceQuery,
  createAddressQuery,
  getAddressQuery,
  setMainAddress,
  changeAddressQuery,
  deleteAddressQuery
} from '../queries/address.query';

export const getProvinceService = async () => {
  try {
    const res = await getProvinceQuery();
    return res;
  } catch (err) {
    throw err;
  }
};
export const createAddressService = async (
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
  longitude
) => {
  try {
    if (isMain == 1) {
      await setMainAddress(userId);
    }

    const res = await createAddressQuery(
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
      longitude
    );
    return res;
  } catch (err) {
    throw err;
  }
};
export const changeAddressService = async (
  userId,
  addressLine,
  cityId,
  postalCode,
  recipientNames,
  recipientsMobileNumber,
  addressLabel,
  addressDetails,
  isMain,
  addressId,
) => {
  try {
    if (isMain == 1) {
      await setMainAddress(userId, addressId);
    }

    const res = await changeAddressQuery(
      userId,
      addressLine,
      cityId,
      postalCode,
      recipientNames,
      recipientsMobileNumber,
      addressLabel,
      addressDetails,
      isMain,
      addressId,
    );
    return res;
  } catch (err) {
    throw err;
  }
};

export const getAddressService = async (id) => {
  try {
    const res = await getAddressQuery(id);

    return res;
  } catch (err) {
    throw err;
  }
};


export const deleteAddressService = async (id) => {
  try {
    const res = await deleteAddressQuery(id)

    return res
  } catch (err) {
    throw err;
  }
};