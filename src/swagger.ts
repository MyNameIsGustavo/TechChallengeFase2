import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

dotenv.config();

export function configuracaoSwagger(app: Express) {
    const configuracaoSwagger = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "API Chronos",
                version: "1.0.0",
                description: "Documentação da API Chronos com Swagger",
            },
            servers: [
                {
                    url: "http://localhost:3000",
                },
                {
                    url: "https://chronos-latest.onrender.com",
                },
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT",
                    },
                },
            },
            security: [
                {
                    bearerAuth: [],
                },
            ],
        },
        apis: ["./src/http/controller/**/*.ts", "./dist/http/controller/**/*.js"]

    };

    const specs = swaggerJsdoc(configuracaoSwagger);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}