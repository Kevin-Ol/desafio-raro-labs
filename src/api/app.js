const express = require('express');
const swaggerUi = require('swagger-ui-express');

const swaggerDocs = require('../swagger.json');
const errorMiddleware = require('../middlewares/error');
const paginationRoutes = require('../routes/pagination');

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/v1', paginationRoutes);

app.use(errorMiddleware);

module.exports = app;
