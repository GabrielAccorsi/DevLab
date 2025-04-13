import Users from "../database/user.database.js";
import bcrypt from "bcrypt";

const createService = async (body) => {
  const hashedPassword = bcrypt.hashSync(body.password, 10); 

  const newUser = {
    id: Users.length + 1,
    ...body,
    password: hashedPassword, 
  };
  Users.push(newUser);
  return newUser;
};

const findByEmailService = async (email) => {
  return Users.find(user => user.email === email);
};

const findAllService = async () => {
  return Users;
};

const findByIdService = async (id) => {
  return Users.find(user => user.id === parseInt(id));
};

const updateService = async (id, avatar, background, bio) => {
  const index = Users.findIndex(user => user.id === parseInt(id));

  if (index !== -1) {
    if (avatar) Users[index].avatar = avatar;
    if (background) Users[index].background = background;
    if (bio) Users[index].bio = bio;

    return Users[index];
  }

  return null;
};


const userService = {
  createService,
  findAllService,
  findByIdService,
  updateService,
  findByEmailService,
};

export default userService;