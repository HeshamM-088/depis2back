const Product = require("../modules/productsSchema.js");
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});  
        return res.status(200).json(products);  
      } catch (error) {
        return res.status(500).json({ message: 'Error retrieving products', error: error.message });
      }
};

const getSingleProduct = async (req, res) => {
    const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving product', error: error.message });
  }
};
const addNewProduct = async (req, res) => {
    const { title, price, image, description } = req.body;
  
    try {
      const newProduct = new Product({
        title,
        price,
        image,
        description
      });
  
      const savedProduct = await newProduct.save();
      return res.status(201).json(savedProduct);
    } catch (error) {
      return res.status(500).json({ message: 'Error adding product', error: error.message });
    }
  };
  

module.exports = { getAllProducts, getSingleProduct,addNewProduct  };
