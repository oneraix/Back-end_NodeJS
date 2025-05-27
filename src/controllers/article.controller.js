import {responseSuccess} from "../common/helpers/response.helper.js"
import articleService from "../services/article.service.js";

const articleController = {
   findAll: async(req, res, next) => {
    const result =  await articleService.findAll(req);
    const resData = responseSuccess(result);
    res.status(resData.statusCode).json(resData);
   },
};

export default articleController;
