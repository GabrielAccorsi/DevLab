import bcrypt from "bcrypt";
import { loginService, generateToken } from "../services/auth.service.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginService(email);

    if (!user || user.status === "inativo") {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    const senhaCorreta = bcrypt.compareSync(password, user.password);
    if (!senhaCorreta) {
      return res.status(401).send({ message: "Senha incorreta" });
    }

    const token = generateToken(user.id);
    const userTipo = user.tipo;
  


    res.send({ token, userTipo});
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export { login };

  