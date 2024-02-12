import Store from '../models/store.model';
import City from '../models/city.model';
import Province from '../models/province.model';
import { where } from 'sequelize';

export const getStoreQuery = async () => {
  try {
    const res = await Store.findAll({
      include: [{ model: City, include: [{ model: Province }] }],
      where: { status: 'active' }
    });

    return res;
  } catch (err) {
    throw err;
  }
};

export const addStoreQuery = async (storeName, latitude, longitude, storeAddress, cityId) => {
  try {
    const res = await Store.create({
      name: storeName,
      city_idcity: cityId,
      latitude: latitude,
      longitude: longitude,
      storeAddress: storeAddress,
    });
    return res;
  } catch (err) {
    throw err;
  }
};
export const changeStoreQuery = async (storeId, name, cityId, latitude, longitude, storeAddress) => {
  try {
    const res = await Store.update(
      {
        name: name,
        city_idcity: cityId,
        latitude: latitude,
        longitude: longitude,
        storeAddress: storeAddress,
        status: 'active'
      },
      { where: { id: storeId } },
    );

    return res;
  } catch (err) {
    throw err;
  }
};
export const deleteStoreQuery = async (storeId) => {
  try {
    const res = await Store.update(
      {
        status: 'inactive'
      },
      { where: { id: storeId } },
    );

    return res;
  } catch (err) {
    throw err;
  }
};
