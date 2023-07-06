import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export function configureSwagger(app: Express) {
  const options = {
    swaggerDefinition: {
      openapi: "3.1.0",
      info: {
        title: "Employee API",
        version: "1.0.0",
        description: "API documentation using Swagger",
      },
    },
    apis: ["**/*.ts"], // Specify the path to your API routes or controllers
  };

  const specs = swaggerJsdoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}
