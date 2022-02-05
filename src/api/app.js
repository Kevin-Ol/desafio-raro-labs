const express = require('express');
const errorMiddleware = require('../middlewares/error');
const paginationRoutes = require('../routes/pagination');

const app = express();

app.use('/v1', paginationRoutes);

app.use(errorMiddleware);

module.exports = app;
