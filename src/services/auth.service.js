import Users from "../database/user.database.js";
import jwt from "jsonwebtoken";

const loginService = (email) => {
  return Users.find(user => user.email === email);
};
const generateToken = (id) =>
    jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 86400 });

  export { loginService, generateToken };