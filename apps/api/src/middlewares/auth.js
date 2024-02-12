import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
  try{
      let token = req.headers.authorization;

      if (!token) return res.status(500).send("Access denied");

      token = token.split(" ")[1];

      if (token === "null" || !token)
      return res.status(500).send("Unauthorized token")

      const secretKey = process.env.JWT_SECRET_KEY;
      if (!secretKey) {
          throw new Error("JWT_SECRET_KEY is not set in the environment");
      }

      let verifiedUser = jwt.verify(token, secretKey);
      if (!verifiedUser) return res.status(500).send("Unauthorized token");

      req.user = verifiedUser;
      next();
  } catch (err){
      return res.status(500).send("Invalid Token")
  }
};