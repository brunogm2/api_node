import { Router } from "express";
import { UseController } from "./controllers/userController";

const router = Router();
const userController = new UseController();

router.post("/users", userController.create);

export { router };