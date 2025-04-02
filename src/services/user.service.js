import Users from "../database/user.database.js";

const createService = async (body) => {
  const newUser = { id: Users.length + 1, ...body };
  Users.push(newUser);
  return newUser;
};

const findAllService = async () => {
  return Users;
};

const findByIdService = async (id) => {
  return Users.find(user => user.id === parseInt(id));
};

const updateService = async (id, name, username, email, password, avatar, background) => {
  const index = Users.findIndex(user => user.id === parseInt(id));

  if (index !== -1) {
    Users[index] = {
      ...Users[index],
      name,
      username,
      email,
      password,
      avatar,
      background,
    };
    return Users[index];
  }

  return null;
};

const userService = {
  createService,
  findAllService,
  findByIdService,
  updateService,
};

export default userService;