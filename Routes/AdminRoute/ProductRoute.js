const express = require('express');
const router = express.Router();
const controller = require('../../Controller/AdminController/ProductController');

// CRUD
router.get('/', controller.getAllProducts);
router.get('/:id', controller.getProduct);
router.post('/', controller.createProduct);
router.put('/:id', controller.updateProduct);
router.delete('/:id', controller.deleteProduct);

// Reviews
router.post('/:id/reviews', controller.addReview);

module.exports = router;
