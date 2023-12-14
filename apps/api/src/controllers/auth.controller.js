import { getUserService } from "../services/auth.service";

const getUserController = async (req, res) => {
  try {
    const result = await getUserService();
    console.log(result)
    // return res.status(200).json({
    //   meesage: "get User success",
    //   date: result
    // })
    return result
  } catch (err) {
    // res.status(500).json({ error: "Internal Server Error" })
    console.log(err)
  }
}

module.exports = {
  getUserController
}