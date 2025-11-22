const express = require('express');
const router = express.Router();
const {
  search,
  getItemById,
  getAllItems
} = require('../controllers/searchController');

router.post('/', search);

router.get('/items', getAllItems);

router.get('/:id', getItemById);

module.exports = router;