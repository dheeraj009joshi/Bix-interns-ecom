const Product = require("../models/product");
const User = require("../models/user");
const { uploadImageAndGetUrl } = require('../config/azure-blob');

// Create a new Product
exports.createProduct = async (req, res, next) => {
  try {
    const { itemName, description, price, inStock, quantity,    category    } = req.body;

    // Check if any files are uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "Thumbnail and images are required" });
    }

    // Initialize variables to store the thumbnail and images
    let thumbnailFile = null;
    let imageFiles = [];

    // Loop through req.files to find the thumbnail and images
    req.files.forEach(file => {
      if (file.fieldname === 'thumbnail') {
        thumbnailFile = file;
      } else if (file.fieldname === 'ImageGallery') {
        imageFiles.push(file);
      }
    });

    // Check if a thumbnail was uploaded
    if (!thumbnailFile) {
      return res.status(400).json({ success: false, message: "Thumbnail is required" });
    }

    // Upload thumbnail
    const thumbnailUrl = await uploadImageAndGetUrl(thumbnailFile.buffer, thumbnailFile.originalname);

    // Upload images if available
    const imageUrls = [];
    for (let imageFile of imageFiles) {
      const imageUrl = await uploadImageAndGetUrl(imageFile.buffer, imageFile.originalname);
      imageUrls.push(imageUrl.split("?")[0]);
    }

    // Create a new Product with the uploaded image URLs
    const newProduct = await Product.create({
      itemName,
      description,
      category,
      price,
      inStock,
      quantity,
      thumbnail: thumbnailUrl.split("?")[0], // Store thumbnail URL
      images: imageUrls, // Store uploaded image URLs
    });

    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error('Error in createProduct:', error);
    next(error); // Pass error to the error handler middleware
  }
};

// Get all Products
exports.getProducts = async (req, res, next) => {
  try {
    const Product = await Product.find();
    if (!Product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: Product });
  } catch (error) {
    console.error('Error in getProduct:', error);
    next(error);
  }
};

// Get a single Product by ID
exports.getProduct = async (req, res, next) => {
  try {
    const Product = await Product.findById(req.params.id);
    if (!Product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: Product });
  } catch (error) {
    console.error('Error in getProduct:', error);
    next(error);
  }
};


// Update a Product by ID
exports.updateProduct = async (req, res, next) => {
  try {
    const { itemName, description, price, inStock, quantity,    category    } = req.body;

    const Product = await Product.findById(req.params.id);
    if (!Product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    let thumbnailUrl = Product.thumbnail;
    let imageUrls = Product.images;

    if (req.files) {
      const thumbnailFile = req.files.find(file => file.fieldname === 'thumbnail');
      if (thumbnailFile) {
        thumbnailUrl = await uploadImageAndGetUrl(thumbnailFile.buffer, thumbnailFile.originalname);
      }

      const imageFiles = req.files.filter(file => file.fieldname === 'ImageGallery');
      if (imageFiles.length > 0) {
        imageUrls = [];
        for (let imageFile of imageFiles) {
          const imageUrl = await uploadImageAndGetUrl(imageFile.buffer, imageFile.originalname);
          imageUrls.push(imageUrl.split("?")[0]);
        }
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
      itemName,
      description,
      category,
      price,
      inStock,
      quantity,
      thumbnail: thumbnailUrl.split("?")[0],
      images: imageUrls,
    }, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error('Error in updateProduct:', error);
    next(error);
  }
};

// Delete a Product by ID
exports.deleteProduct = async (req, res, next) => {
  try {
    const Product = await Product.findByIdAndDelete(req.params.id);
    if (!Product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error('Error in deleteProduct:', error);
    next(error);
  }
};
