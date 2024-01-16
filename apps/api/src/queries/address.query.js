import City from '../models/city.model';
// import Store from '../models/store.model';
import Province from '../models/province.model';
import Address from '../models/address.model';

export const getProvinceQuery = async () => {
  try {
    const res = await Province.findAll({
      include: [{ model: City }],
    });

    return res;
  } catch (err) {
    throw err;
  }
};

export const createAddressQuery = async (
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
    const res = await Address.create({
      user_iduser: userId,
      addressLine: addressLine,
      city_idcity: cityId,
      postalCode: postalCode,
      recipientNames: recipientNames,
      recipientsMobileNumber: recipientsMobileNumber,
      addressLabel: addressLabel,
      addressDetails: addressDetails,
      isMain: isMain,
    });

    return res;
  } catch (err) {
    console.log(err)
    throw err;
  }
};
export const changeAddressQuery = async (
  userId,
  addressLine,
  cityId,
  postalCode,
  recipientNames,
  recipientsMobileNumber,
  addressLabel,
  addressDetails,
  isMain,
  addressId
) => {
  try {
    console.log(userId)
    console.log(addressId)
    const res = await Address.update({
      user_iduser: userId,
      addressLine: addressLine,
      city_idcity: cityId,
      postalCode: postalCode,
      recipientNames: recipientNames,
      recipientsMobileNumber: recipientsMobileNumber,
      addressLabel: addressLabel,
      addressDetails: addressDetails,
      isMain: isMain,
    }, { where: { id: addressId } });

    return res;
  } catch (err) {
    console.log(err)
    throw err;
  }
};

export const getAddressQuery = async (id) => {
  try {
    const res = await Address.findAll({
      where: {
        user_iduser: id
      },
      include: [{ model: City, include: Province }]
    })

    return res
  } catch (err) {
    throw err;
  }
}

export const setMainAddress = async (userId, addresId) => {
  try {
    await Address.update({ isMain: 0 }, { where: { user_iduser: userId } });

    if (addresId) {
      await Address.update({ isMain: 1 }, { where: { user_iduser: userId, id: addresId } })
    }

    return true
  } catch (err) {
    throw err
  }
}