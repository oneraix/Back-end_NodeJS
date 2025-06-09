import express from "express";
import articleController from "../controllers/article.controller.js";
import protect from "../common/middlewares/protect.middleware.js";
import checkPermission from "../common/middlewares/check-permission.middleware.js";


const articleRouter = express.Router();

articleRouter.get("/",  protect, checkPermission ,articleController.findAll)

export default articleRouter;
