const { Router } = require('express');
const paginationController = require('../controllers/pagination');

const paginationRoutes = Router();

paginationRoutes.get('/pagination', paginationController);

module.exports = paginationRoutes;
