import {
  registerService,
  loginService,
  setPasswordService,
  loginWithSocialService,
  registerWithSocialService,
  keepLoginService
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
    const result = await setPasswordService(resetToken, password)

    res.status(200).json({
      message: "Set password success",
      data: result,
    })
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export const keepLoginController = async (req, res) => {
  try{
      const id = req.user?.id;

      console.log("keeplogin req user", req.user)

      // if (id === undefined) {
      //     return res.status(401).json({
      //         message: "Unauthorized",
      //     });
      // }

      const result = await keepLoginService(id);

      return res.status(200).json({
          message: "Success",
          data: result
      });
  } catch (err){
      return res.status(500).send(err.message)
  }
};