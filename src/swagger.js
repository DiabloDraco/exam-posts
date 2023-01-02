import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";
import { PORT } from "./config.js";

const router = Router()

const swaggerDocs = swaggerJSDoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    servers: [
      {
        url: `http://localhost:${PORT}`,
        variables: {
          port: {
            enum: [PORT],
            default: PORT,
          },
        },
      },
      {
        url: `https://exam-posts.onrender.com`,
        variables: {
          port: {
            enum: [PORT],
            default: PORT,
          },
        },
      },
    ],

    info: {
      version: '1.0.0',
      title: 'Pressa API'
    },

    components: {
      securitySchemes: {
        Bearer: {
          type: 'apiKey',
          name: 'token',
          in: 'header'
        },
      },
    },
  },
  apis: [
    `${process.cwd()}/src/swagger/components/*.yaml`,
    `${process.cwd()}/src/swagger/docs/*.yaml`,
  ],
});


router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
export default router;