import { responseSuccess } from "../common/helpers/response.helper";
import { roleService } from "../services/role.service"

export const roleCotroller = {
    create: async function (req, res, next) {
        const result = await roleService.create(req);
        const response = responseSuccess(result,"Create Success");
        res.status(response.statusCode).json(response);
    },

    findAll: async function (req, res, next) {
        const result = await roleService.findAll(req);
      const response = responseSuccess(result, `Get role #${req.params.id} successfully`);
        res.status(response.statusCode).json(response);
    },

    findOne: async function (req,res, next){
        const result = await roleService.findOne(req);
        const response = responseSuccess(result, "Get role success");
        res.status(response.statusCode).json(response);
    },

    update: async function (req,res, next) {
        const result = roleService.update(req);
        const response = responseSuccess(result, "Update success");
        res.status(response.statusCode).json(response);  
    },

    remove: async function (req, res, next) {
        const result = roleService.delete(req);
        const response = responseSuccess(result, "Delete success");
        res.status(response.statusCode).json(response);
        
    },

    togglePermission: async function (req, res, next) {
      const result = await roleService.togglePermission(req);
      const response = responseSuccess(result, `Remove role #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   }
}