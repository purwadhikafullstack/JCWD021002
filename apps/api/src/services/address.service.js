import {
  getProvinceQuery,
  createAddressQuery,
  getAddressQuery,
  setMainAddress,
  changeAddressQuery,
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
) => {
  try {
    console.log(isMain);
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
    );
    return res;
  } catch (err) {
    console.log(err);
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
    console.log(err);
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
