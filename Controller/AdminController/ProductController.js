const Product = require('../../Schema/AdminSchema/Product');

// GET /api/products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.json({ status: true, data: products });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// GET /api/products/:id  (search by product_id or Mongo _id)
exports.getProduct = async (req, res) => {
  try {
    const id = req.params.id;

    let query;
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { $or: [{ product_id: id }, { _id: id }] };
    } else { query = { product_id: id };  }
    
    const product = await Product.findOne({ $or: [{ product_id: id }, { _id: id }] }).lean();
    if (!product) return res.status(404).json({ status: false, message: 'Product not found' });
    res.json({ status: true, data: product });
    
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const payload = req.body;
    const exists = await Product.findOne({ product_id: payload.product_id });
    if (exists) return res.status(400).json({ status: false, message: 'Product with this product_id already exists' });
    const p = new Product(payload);
    await p.save();
    res.status(201).json({ status: true, data: p });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const product = await Product.findOneAndUpdate({ $or: [{ product_id: id }, { _id: id }] }, payload, { new: true });
    if (!product) return res.status(404).json({ status: false, message: 'Product not found' });
    res.json({ status: true, data: product });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOneAndDelete({ $or: [{ product_id: id }, { _id: id }] });
    if (!product) return res.status(404).json({ status: false, message: 'Product not found' });
    res.json({ status: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// POST /api/products/:id/reviews  (add review)
exports.addReview = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body; // should be review object
    const product = await Product.findOne({ $or: [{ product_id: id }, { _id: id }] });
    if (!product) return res.status(404).json({ status: false, message: 'Product not found' });
    product.reviews.push(payload);
    await product.save();
    res.json({ status: true, data: product.reviews });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
