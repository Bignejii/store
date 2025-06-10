const { Product } = require('../Models');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const { category } = req.query;
        const whereClause = category ? { category } : {};
        const products = await Product.findAll({ where: whereClause });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { title, description, price, category, amount } = req.body;
        let thumbnail = '';
        let downloadUrl = '';

        console.log('Files received:', req.files); // Debug log

        // Handle thumbnail
        if (req.files && req.files['thumbnail']) {
            const thumbnailFile = req.files['thumbnail'][0];
            console.log('Thumbnail file:', thumbnailFile); // Debug log
            thumbnail = `http://localhost:3000/uploads/images/${thumbnailFile.filename}`;
        }

        // Handle product file
        if (req.files && req.files['productFile']) {
            const productFile = req.files['productFile'][0];
            console.log('Product file:', productFile); // Debug log
            downloadUrl = `http://localhost:3000/uploads/files/${productFile.filename}`;
        }

        // Validate required fields
        if (!title || !description || !price || !category) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        console.log('Received amount:', amount, 'Type:', typeof amount);

        console.log('Creating product with data:', { // Debug log
            title,
            description,
            price: parseFloat(price),
            thumbnail,
            category,
            downloadUrl,
            amount: amount ? parseInt(amount) : null
        });

        // Create the product
        const product = await Product.create({
            title,
            description,
            price: parseFloat(price),
            thumbnail,
            category,
            downloadUrl: downloadUrl || 'https://example.com/download',
            amount: amount ? parseInt(amount) : null
        });

        console.log('Product created:', product); // Debug log
        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: error.message });
    }
};

// Add product with file/image upload (for multipart/form-data)
exports.addProduct = async (req, res) => {
    try {
        const { title, category, price, description, thumbnailUrl } = req.body;
        let thumbnail = thumbnailUrl || '';
        let downloadUrl = '';

        if (req.files && req.files['thumbnail']) {
            thumbnail = '/uploads/' + req.files['thumbnail'][0].filename;
        }
        if (req.files && req.files['productFile']) {
            downloadUrl = '/uploads/' + req.files['productFile'][0].filename;
        }

        const product = await Product.create({
            title,
            category,
            price,
            description,
            thumbnail,
            downloadUrl
        });

        res.status(201).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add product' });
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price, category } = req.body;
        let thumbnail = req.body.thumbnail;

        // Handle new uploaded file
        if (req.files && req.files['thumbnail']) {
            const thumbnailFile = req.files['thumbnail'][0];
            thumbnail = `http://localhost:3000/uploads/images/${thumbnailFile.filename}`;
        }

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.update({
            title,
            description,
            price: parseFloat(price),
            thumbnail,
            category
        });
        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.destroy();
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};