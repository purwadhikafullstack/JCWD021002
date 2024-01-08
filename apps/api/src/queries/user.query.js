import User from '../models/user.model';
import Store from '../models/store.model';
import City from '../models/city.model';
import Province from '../models/province.model';
// import Role from '../models/role.model';
import { Op } from 'sequelize';

const getUserRegisterQuery = async ({
  id = null,
  username = null,
  email = null,
  referralCode = null,
}) => {
  try {
    const res = await User.findOne({
      where: {
        [Op.or]: {
          id: id,
          username: username,
          email: email,
          referralCode,
        },
      },
    });
    return res;
  } catch (err) {
    throw err;
  }
};

const getUserQuery = async (page, pageSize, roleId, username) => {
  try {
    const offset = (page - 1) * (pageSize || 0);

    const whereConditions = {};

    if (roleId) {
      whereConditions.role_idrole = roleId;
    }

    if (username) {
      whereConditions.username = { [Op.like]: `%${username}%` };
    }

    console.log('ini di query', username);

    const allUsers = await User.findAll({
      offset: offset,
      limit: pageSize || undefined,
      where: whereConditions,
    });

    const totalUsers = await User.count({
      where: whereConditions,
    });

    const totalPages = Math.ceil(totalUsers / (pageSize || totalUsers));

    return {
      allUsers,
      totalPages,
    };
  } catch (err) {
    throw err;
  }
};

const getDetailUserQuery = async (userId) => {
  try {
    const result = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Store,
          include: [
            {
              model: City,
              include: [
                {
                  model: Province,
                },
              ],
            },
          ],
        },
      ],
    });

    return result;
  } catch (err) {
    throw err;
  }
};

const updateUserQuery = async (
  id,
  username,
  email,
  fullname,
  avatar,
  role_idrole,
  status,
  store_idstore,
) => {
  try {
    const updatedValue = {
      username,
      email,
      fullname,
      avatar,
      role_idrole,
      status,
    };

    console.log(username);
    console.log(email);

    Object.keys(updatedValue).forEach((key) => {
      if (
        updatedValue[key] == null ||
        updatedValue[key] == undefined ||
        updatedValue[key] == ' ' ||
        updatedValue[key] == ''
      ) {
        delete updatedValue[key];
      }
    });

    if (id) {
      await User.update(updatedValue, {
        where: { id: id },
      });
    }
  } catch (err) {
    throw err;
  }
};

const addUserQuery = async (
  username,
  email,
  fullname,
  hashPassword,
  avatar,
  role_idrole,
  store_idstore,
) => {
  console.log('ini di query', store_idstore);
  try {
    const result = await User.create({
      username,
      email,
      password: hashPassword,
      fullname,
      avatar,
      role_idrole,
      status: 'Active',
      store_idstore: store_idstore ? store_idstore : null,
      registrationDate: new Date(),
    });

    return result;
  } catch (err) {
    throw err;
  }
};

const getUserLoginQuery = async ({ emailOrUsername }) => {
  try {
    const res = await User.findOne({
      where: {
        [Op.or]: {
          username: emailOrUsername,
          email: emailOrUsername,
        },
      },
    });
    return res;
  } catch (err) {
    throw err;
  }
};

const findUserQuery = async ({ email = null, username = null }) => {
  try {
    const res = await User.findOne({
      where: {
        [Op.or]: {
          username: username,
          email: email,
        },
      },
    });

    return res;
  } catch (err) {
    throw err;
  }
};

const getStoreQuery = async () => {
  try {
    const result = await Store.findAll({});

    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getUserQuery,
  updateUserQuery,
  getDetailUserQuery,
  addUserQuery,
  findUserQuery,
  getStoreQuery,
  getUserRegisterQuery,
  getUserLoginQuery
};
