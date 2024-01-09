import City from '../models/city.model';
// import Store from '../models/store.model';
import Province from '../models/province.model'
const { Op } = require('sequelize');

export const getProvinceQuery = async () => {
  try {
    const res = await Province.findAll({
      include: [
        { model: City }
      ],
    });

    return res;
  } catch (err) {
    throw err;
  }
};
export const getCityQuery = async (id) => {
  try {
    const res = await City.findAll({
      where: {
        province_idprovince: id
      }
    });

    return res;
  } catch (err) {
    throw err;
  }
};
