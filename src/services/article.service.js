import prisma from "../common/prisma/init.prisma";

const articleService = {
   findAll: async (req) => {
      let { page, pageSize, filters } = req.query;
      page = +page > 0 ? +page : 1;
      pageSize = +pageSize > 0 ? +pageSize : 3;
      filters = JSON.parse(filters || `{}`);

      // console.log(Object.entries(filters1));
      Object.entries(filters).forEach(([key, value], i, arr) => {
         console.log(key, value);
         if(value === ''|| value === null || value === undefined ){
            delete filters[key];
         }
         if (typeof value === "string") {
            filters[key] = { contains: value };
         }
      });

      console.log("\n");
      console.log("Xử lý \t\t", filters);

      const where = {
         ...filters,
      };
      console.log("Mong muốn \t", where);
      console.log("\n");

      // (page - 1) * pageSize
      const skip = (page - 1) * pageSize;

      const articles = await prisma.articles.findMany({
         take: pageSize, // LIMIT
         skip: skip, // OFFSET,
         orderBy: {
            createdAt: "desc",
         },
         where: where,
      });

      const totalItem = await prisma.articles.count({
         where: where,
      });
      const totalPage = Math.ceil(totalItem / pageSize);

      return {
         page: page, // Số trang
         pageSize: pageSize, // Một trang có bao nhiêu item
         totalItem: totalItem, // Tổng cộng có tất cả bao nhiêu item
         totalPage: totalPage, // Tổng cộng có bao nhiêu trang
         items: articles,
      };
   },
};

export default articleService;
