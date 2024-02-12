import City from '../models/city.model';
import Store from '../models/store.model';
import Province from '../models/province.model'
const { Op } = require('sequelize');

export const getCityQuery = async (cityName, provinceId, cityId) => {
  try {

    let params = {}

    if (cityName) {
      params = {
        city: {
          [Op.like]: `%${cityName}%`
        }
      }
    }
    if (provinceId) {
      params = {
        province_idprovince : provinceId
      }
    }
    if (cityId) {
      params = {
        id : cityId
      }
    }

    const res = await City.findAll({
      include: [
        { model: Province }
      ],
      where: params,
    });

    return res;
  } catch (err) {
    throw err;
  }
};
