import User from "../models/user.model";
const { Op } = require("sequelize");

  const getUserQuery = async (page, pageSize, roleId) => {
  try {
    const offset = (page - 1) * (pageSize || 0);

    const allUsers = await User.findAll(

      {
        offset: offset,
        limit: pageSize ? pageSize : undefined,
        where: roleId ? {role_idrole: roleId} : {}
      }
    )

    const totalUsers = await User.count({
      where: roleId ? {role_idrole: roleId} : {}
    })

    const totalPages = Math.ceil(totalUsers / (pageSize || totalUsers));

    return {
      allUsers,
      totalPages
    };
  } catch (err) {
    throw err
  }
}

const getDetailUserQuery = async (userId) => {
  try {
    const result = await User.findOne({
      where: {id: userId}
    })

    return result;
  } catch (err) {
    throw err;
  }
}

  const updateUserQuery = async (
    id,
    username,
    email,
    fullname,
    avatar,
    role_idrole,
    status,
  ) => {
    try {
      const updatedValue = {
        username,
        email,
        fullname,
        avatar,
        role_idrole,
        status,
      }

      Object.keys(updatedValue).forEach((key) => {
        if (updatedValue[key] == null || updatedValue[key] == undefined) {
          delete updatedValue[key];
        }
      });

      if (id) {
        await User.update(updatedValue, {
          where: {id: id}
        })
      }
    } catch (err) {
      throw err;
    }
  }

  const addUserQuery = async (
    username,
    email,
    hashPassword,
    fullname,
    avatar,
    role_idrole,
  ) => {
    try {
      const result = await User.create({
        username,
        email,
        password: hashPassword,
        fullname,
        avatar,
        role_idrole,
        status: 1,
      })

      return result;
    } catch (err) {
      throw err;
    }
  }

  
const findUserQuery = async ({ email = null, username = null }) => {
  try {
    const res = await User.findOne({
      where: {
        [Op.or]: {
          email,
          username,
        },
      },
    });

    return res;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getUserQuery,
  updateUserQuery,
  getDetailUserQuery,
  addUserQuery,
  findUserQuery
}