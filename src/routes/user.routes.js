import { Router } from "express";
import userController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const routes = Router()

routes.post("/create",userController.create)
routes.get("/",userController.findAll)
routes.get("/:id",userController.findById)
routes.patch("/:id",authMiddleware, userController.update)

export default routes