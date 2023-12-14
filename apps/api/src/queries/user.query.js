import User from "../models/user.model";
const { Op } = require("sequelize");

export const getUserQuery = async () => {
  try {
    const res = await User.findAll()
    return res;
  } catch (err) {
    throw err
  }
}

module.exports = {
  getUserQuery
}