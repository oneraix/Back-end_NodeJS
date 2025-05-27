import { token } from "morgan";
import { BadrequestException } from "../common/helpers/exception.helper";
import prisma from "../common/prisma/init.prisma";
import bcrypt from "bcrypt";
import tokenService from "./token.service";

const authService = {
   register: async (req) => {
      const { email, password, fullName } = req.body;

      // Tìm kiếm email đã tồn tại hay chưa
      const userExist = await prisma.users.findUnique({
         where: {
            email: email,
         },
      });
      console.log(`userExist`, userExist);

      if (userExist) {
         throw new BadrequestException("Tài khoản đã tồn tại vui lòng đăng nhập");
      }

      const passwordHash = bcrypt.hashSync(password, 10);

      const userNew = await prisma.users.create({
         data: {
            email: email,
            password: passwordHash,
            fullName: fullName,
         },
      });
      delete userNew.password;
      return userNew;
   },


   login: async(req)=>{
      const{email, password} = req.body;
      const userExist = await prisma.users.findUnique({
         where:{
            email:email,
         },
      });
      if(!userExist){
         throw new BadrequestException("Người dùng chưa đăng kí tài khoản")
      }

      const isPassword = bcrypt.compareSync(password, userExist.password)
      if(!isPassword){
         throw new BadrequestException("Mật khẩu không chính xác")
      }
      const tokens = tokenService.createTokens(userExist.id);
      return tokens;
   },

   getInfo: async(req)=>{
      delete req.user.password;
      return req.user;
   },

   googleLogin: async(req)=>{
      delete req.user.password;
      return req.user;
   }
};

export default authService;
