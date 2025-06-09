import { BadrequestException } from "../helpers/exception.helper";
import prisma from "../prisma/init.prisma";

const checkPermision = async (req, res, next)=>{

    req.isCheckPermision = true;
    const user = req.user;

    if(!user){
        throw new BadrequestException("User không tồn tại từ protect")
    }

    //nếu roleId === 1 là role Admin, quyền cao nhất nên cho qua
    if(user.roleId === 1){
        next()
        return
    }

    const method = req.method
    const endpoint = req.baseUrl + req.route?.path

    const rolePermissionExist = await prisma.rolePermission.findFirst({
        where:{
            roleId: user.roleId,
            Permissions:{
                method: method,
                endpoint: endpoint
            },
            isActive:true,
            Roles:{
                isActive:true
            }
        }
    })

    console.log({rolePermissionExist,user,method, endpoint});
    if(!rolePermissionExist){throw new BadrequestException("Không có quyền truy cập")}

    next();
};

export default checkPermision;