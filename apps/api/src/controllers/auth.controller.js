import { getUserService, registerService, loginService } from "../services/auth.service";

export const getUserController = async (req, res) => {
  try {
    const result = await getUserService();
    return res.status(200).json({
      message: "get User success",
      data: result,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export const registerController = async (req, res) => {
  try {
    const { username, email, password, fullname } = req.body;
    const result = await registerService(username, email, password, fullname)

    return res.status(200).json({
      message: "Register Success",
      data: result,
    })
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export const loginController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const result = await loginService(username, email, password);

    res.status(200).json({
      message: "Login Success",
      data: result,
    })
  } catch (err) {
    res.status(500).send(err.message)
  }
}


// module.exports = {
//   getUserController,
//   registerController
// };
