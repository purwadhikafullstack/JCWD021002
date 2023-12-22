import {
  registerService,
  loginService,
  setPasswordService,
  loginWithSocialService,
  registerWithSocialService
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

export const loginWithSocialController = async (req, res) => {
  try {
    console.log("body controller", req.body)
    const { email } = req.body;
    const result = await loginWithSocialService(email);

    return res.status(200).json({
      message: 'Login Success',
      data: result,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const registerWithSocialController = async (req, res) => {
  try {
    console.log("body controller", req.body)
    const { username, email, fullname  } = req.body;
    const result = await registerWithSocialService(username, email, fullname);

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
    const { resetToken } = req.query;
    const { password } = req.body;
    const result = setPasswordService(resetToken, password)

    res.status(200).json({
      message: "Set password success",
      data: result,
    })
  } catch (err) {
    res.status(500).send(err.message)
  }
}
