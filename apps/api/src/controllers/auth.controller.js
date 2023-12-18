import {
  registerService,
  loginService,
} from '../services/auth.service';

export const registerController = async (req, res) => {
  try {
    const { username, email, password, fullname } = req.body;
    const result = await registerService(username, email, password, fullname);

    return res.status(200).json({
      message: 'Register Success',
      data: result,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
export const loginController = async (req, res) => {
  try {
    console.log("body", req.body)
    const { emailOrUsername, password } = req.body;
    const result = await loginService(emailOrUsername, password);

    return res.status(200).json({
      message: 'Login Success',
      data: result,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const setPasswordController = async (req, res) => {
  try {
    const { email } = req.query;
    const result = setPasswordService()
  } catch (err) {
    res.status(500).send(err.message)
  }
}
