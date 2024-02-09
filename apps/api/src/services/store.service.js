import {
  getStoreQuery,
  addStoreQuery,
  changeStoreQuery,
  deleteStoreQuery
} from '../queries/store.query';
import { getPaginatedAndFilteredProductsQuery } from '../queries/product.query';
const haversine = require('haversine-distance');

export const getStoreListService = (name) => {
  try {
    const res = getStoreQuery({name})


    return res
  } catch (err) {
    throw err
  }
}

export const getStoreService = async (
  page,
  pageSize,
  sortField,
  sortOrder,
  categoryId,
  productName,
  cityId,
  statusProduct,
  statusStock,
  latitude,
  longitude,
  name
) => {
  try {
    // Mengambil daftar toko dari query atau fungsi yang sesuai
    const stores = await getStoreQuery({ name });
    // Inisialisasi variabel untuk menyimpan ID toko terdekat
    let storeId = 1;
    let minDistance = Number.MAX_VALUE;

    // Mengambil store terdekat dengan user
    for (const store of stores) {
      console.log('store query', store.dataValues)

      const storeCoords = {
        latitude: store.dataValues.latitude,
        longitude: store.dataValues.longitude,
      };

      const userCoords = {
        latitude: latitude,
        longitude: longitude,
      };

      const distance = haversine(userCoords, storeCoords);

      if (distance < minDistance) {
        minDistance = distance;
        storeId = store.dataValues.id;
      }
    }

    console.log("ini di store id", storeId);
    // Mengambil produk dengan paginasi dan filter untuk toko terdekat
    const result = await getPaginatedAndFilteredProductsQuery(
      page,
      pageSize,
      sortField,
      sortOrder,
      categoryId,
      productName,
      cityId,
      storeId,
      statusProduct,
      statusStock,
    );

    console.log({result})
    return result;
  } catch (err) {
    throw err;
  }
};

export const addStoreService = async (
  storeName,
  latitude,
  longitude,
  storeAddress,
  cityId,
) => {
  try {
    const res = await addStoreQuery(
      storeName,
      latitude,
      longitude,
      storeAddress,
      cityId,
    );

    return res;
  } catch (err) {
    throw err;
  }
};
export const changeStoreService = async (storeId, name, cityId, latitude, longitude, storeAddress) => {
  try {
    const res = await changeStoreQuery(storeId, name, cityId, latitude, longitude, storeAddress);

    return res;
  } catch (err) {
    throw err;
  }
};
export const deleteStoreService = async (storeId) => {
  try {
    const res = await deleteStoreQuery(storeId);

    return res;
  } catch (err) {
    throw err;
  }
};
