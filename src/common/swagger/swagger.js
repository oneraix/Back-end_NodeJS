import articleSwagger from "./article.swagger";

const swaggerDocument = {
  openapi: "3.1.1", // Sử dụng phiên bản phổ biến, ổn định
  info: {
    title: "Cyber Community API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3069",
      description: "Local Server",
    },
    {
      url: "http://minhhieu:3069",
      description: "Product Server",
    },
  ],
  components: {
    securitySchemes: { // ✅ sửa đúng key
      Minh_Hieu_BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  path:{
    ...articleSwagger
  }
};

export default swaggerDocument;
