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
      }
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
router
export default router;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MTU0Njk5MSwiZXhwIjoxNjcxNTcyMTkxfQ.FbK6DAY9KzRXUBHvh6od_Zc5KGvK2fXV7TbWevfA8B0