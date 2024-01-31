import User from '../models/user.model';
import Store from '../models/store.model';
import City from '../models/city.model';
import Province from '../models/province.model';
import Role from '../models/role.model';
import { Op, where } from 'sequelize';

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
        status: 'Active'
      },
    });
    return res;
  } catch (err) {
    throw err;
  }
};

const getUserQuery = async (page, pageSize, sortOrder, username, roleId) => {
  try {
    const offset = (page - 1) * (pageSize || 0);

    const whereConditions = {};

    if (roleId > 1) {
      whereConditions.role_idrole = roleId;
    } else {
      whereConditions.role_idrole = {
        [Op.notIn]: [1] // Exclude role_idrole = 1 (assuming 1 is admin role)
      };
    }

    console.log("ini roleId", roleId);
    console.log("ini wherecondition", whereConditions);

    

    if (username) {
      whereConditions.username = { [Op.like]: `%${username}%` };
    }


    const allUsers = await User.findAll({
      offset: offset,
      limit: pageSize || undefined,
      where: whereConditions,
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
      order: [[{model : City}, 'name', 'asc']],
      order: [['status', 'asc']],
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
      where: { id: userId, status: 'Active' },
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
      store_idstore
    };

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
      verification_status: 'Verified',
    });

    return result;
  } catch (err) {
    console.log(err);
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
        status: 'Active'
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
        status: 'Active'
      },
    });

    return res;
  } catch (err) {
    throw err;
  }
};

const getStoreQuery = async (cityId) => {
  try {
    let queryOptions = {};

    if (cityId) {
      queryOptions.where = {
        city_idcity: cityId
      };
    }

    const result = await Store.findAll(queryOptions);

    return result;
  } catch (err) {
    throw err;
  }
};

const getUserRoleQuery = async (userId) => {
  try {
    const user = await User.findOne({
      where: {id: userId},
      include: [{model: Role}],
      attributes: ['id', 'role_idrole'],
    })
    return user;
  } catch (err) {
    throw err;
  }
}

const resetPasswordQuery = async (userId, newPassword) => {
  try {
    const res = await User.update({
      password: newPassword
    }, {
      where: {
        id: userId
      }
    })
    return res
  } catch (err) {
    throw err
  }
}

const deleteUserQuery = async (id) => {
  try {
    const res = await User.update({
      status: 'Deactive',
    },
      {
        where: {
          id: id
        }
      }
    )

    return res
  } catch (err) {
    throw err
  }
}

module.exports = {
  getUserQuery,
  updateUserQuery,
  getDetailUserQuery,
  addUserQuery,
  findUserQuery,
  getStoreQuery,
  getUserRegisterQuery,
  getUserLoginQuery,
  getUserRoleQuery,
  resetPasswordQuery,
  deleteUserQuery,
};
