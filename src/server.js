import express, { request } from "express";
import mysql from 'mysql2/promise';
import { DataTypes, Sequelize } from "sequelize";
import initModels from "./models/init-models.js";

const app = express()

//middleware
app.use(express.json())// chuyển dữ liệu từ JSON sang dôi tượng javascript


app.get("/", (req  ,res ,next ) =>{
    res.json("hello world");
})

//---------------------------4 CÁCH NHẬN DỮ LIỆU TỪ FRONT-END----------------------------------- 

//---QUERY (bắt đầu bằng dấu "?" và phân tách biến bằng dấu "&")
//thường dùng khi phân trang, lọc, tìm kiếm
app.get("/query",(req, res, next)=>{
    const query = req.query;
    console.log(query);
    res.json(query);
})

//---PARAMS (bắt đầu bằng dấu "/:id" )
//thường dùng để lấy thông tin chi tiết
app.get("/params/:id",(req,res,next)=>{
    const params = req.params;
    console.log(params);
    res.json(params);
})

//---HEADERS
//thường dùng khi gửi token , x-api-key
app.delete("/headers",(req,res,next)=>{
    const headers = req.headers;
    console.log(headers);
    res.json(headers)
})

//---BODY
//thường sử dụng khi tạo mới dữ liệu, dữ liệu gửi lên nhiều
app.post("/body",(req,res,next)=>{
    const body = req.body;
    console.log(body);
    res.json(body);
})


const DATABASE_URL = `mysql://root:1234@localhost:3307/db_cyber_community_code`;
//MYSQL
const pool = mysql.createPool({uri: DATABASE_URL})


app.get("/mysql2", async (req, res, next) => {

    const [rows,fields] = await pool.query("SELECT * FROM Roles")
    
    res.json(rows);
 });


//SEQUELIZE
const sequelize = new Sequelize(DATABASE_URL);
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }


//CODE FIRST
//model
const Roles = sequelize.define("Roles",{ //modelname ở đây là tên để gọi trong code back-end không hẳn là tên table trong database
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:true
    },
    description:{
        type: DataTypes.STRING,
        allowNull:true
    },
    isActive:{
        type:DataTypes.BOOLEAN,
        allowNull: true
    },
    deletedBy:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    isDeleted:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    deletedAt:{
        type:"TIMESTAMP",
        allowNull:true
    },
    createdAt:{
        type:"TIMESTAMP",
        allowNull:false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt:{
        type:"TIMESTAMP",
        allowNull:false,
        defaultValue:sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    }


},
{
    
    tableName:"Roles",//trong code first đây sẽ là tên table được tạo.
    timestamps: false,
}

)
Roles.sync();


//DATABASE FIRST
//đồng bộ database vào code bằng Sequelize-Auto
//npx sequelize-auto -h localhost -d db_cyber_community_code -u root -x 1234 -p 3307 --dialect mysql -o ./models -l esm -a ./additional.json
const models = initModels(sequelize);
app.get("/sequelize", async (req, res, next) => {
   const listRole1 = await Roles.findAll();

   const listRole2 = await models.Roles.findAll();

   const result = {
      "Model tự tạo": listRole1,
      "Model do sequelize-auto tạo ra": listRole2,
   };

   res.json(result);
});


app.listen(3069, () =>{
    console.log(`Server is running on port http://localhost:3069`);
});

/**
 * express: lõi để xây dựng BE -> API
 * nodemon: reload lại server khi có code thay
 * mysql2: để tương tác với DB bằng CÂU LỆNH SQL
 * sequelize: ORM giúp tương tác với DB bằng function
 * sequelize-auto: Tự động tạo code model cho sequelize từ database có sẵn
 */