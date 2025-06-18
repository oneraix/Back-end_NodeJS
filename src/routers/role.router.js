import express from "express";
import { roleCotroller } from "../controllers/role.controller";

const roleRouter = express.Router();

roleRouter.get("/", roleCotroller.findAll);
roleRouter.post("/", roleCotroller.create);
roleRouter.get('/:id', roleCotroller.findOne);
roleRouter.patch(":id", roleCotroller.update);
roleRouter.delete(":id", roleCotroller.remove)
roleRouter.post('/toggle-permission', roleCotroller.togglePermission);

export default roleRouter;