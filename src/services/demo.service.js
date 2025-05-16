import pool from "../common/mysql2/init.mysql2.js";
import { models } from "../common/sequelize/init.sequelize.js";
import Roles from "../models/Roles-by-myself.js";
const demoService ={
    helloWorld: () =>{
        return "Hello World"
    },

    query: (req) =>{
    const query = req.query;
    console.log(query);
    return query;
    },

   params: (req) => {
      const params = req.params;

      console.log(params);

      return params;
   },
   headers: (req) => {
      const headers = req.headers;

      console.log(headers);

      return headers;
   },
   body: (req) => {
      const body = req.body;

      console.log(body);

      return body;
   },


   mysql2: async () => {
      const [rows, fields] = await pool.query("SELECT * FROM Roles");

      return rows;
   },

      sequelize: async () => {
      const listRole1 = await Roles.findAll();

      const listRole2 = await models.Roles.findAll();

      const result = {
         "Model tự tạo": listRole1,
         "Model do sequelize-auto tạo ra": listRole2,
      };

      return result;
   },

}

export default demoService