import userService from "../services/user.service.js";
import { generateToken } from "../services/auth.service.js";

const userController = {
  create: async (req, res) => {
    try {
      const { name, username, email, password, avatar, background } = req.body;
      if (!name || !email || !password ) {
        return res.status(400).send({ messege: "Submit all filds for registration" });
      }
   
      const existe = await userService.findByEmailService( email );
      if (existe) {
        return res.status(409).json({ mensagem: 'Usuário já cadastrado.' });
      }
  
      const tipo = email.endsWith('@admin.com') ? 'adm' : 'aluno';

      const body = {name, username, email, password, avatar, background, tipo};
      const user = await userService.createService(body);
      if (!user) {
        return res.status(400).send({ message: "Error creating user" });
      }
      const token = await generateToken(user.id);

      res.status(201).send({
        message: "User created successfuly",
        token,
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  findAll: async (req, res) => {
    try {
      const users = await userService.findAllService();
      if (users.length === 0) {
        return res
          .status(400)
          .send({ message: "There are no registered users" });
      }

      res.send(users);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  findById: async (req, res) => {
    try {
        const user = req.user; 
      res.send({user});
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  update: async (req, res) => {
    try {
      const { avatar, background , bio} = req.body;
      if (!avatar && !background && !bio) {
        return res.status(400).send({ message: "Submit at least one field for update" });
      }

      const userId = req.user?.id; 
      if (!userId) {
        return res.status(401).send({ message: "Unauthorized" });
      }

      await userService.updateService(
        userId,
        avatar,
        background,
        bio
      );
      const user = await userService.findByIdService(userId);
      console.log(userId, user);

      res.send({ message: "User successfully updated" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      let userId = req.user?.id; 
      if (!user) {
        return res.status(401).send({ message: "Unauthorized" });
      }
      await userService.deleteService(userId);
      user = await userService.findByIdService(userId);
      console.log(user);
    res.send({message: "User successfully deleted" , user});
  } catch (err) {
    res.status(500).send({ message: err.message });
  }},
  delete1: async (req, res) => {
    try {
      const userId = req.user?.id; 
      if (!userId) {
        return res.status(401).send({ message: "Unauthorized" });
      }

      await userService.deleteService1(userId);
      res.send({ message: "User successfully deleted" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }
};

export default userController;