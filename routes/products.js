const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Ruta para listar todos los productos con limitación opcional
router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit) || Infinity;
    const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/productos.json')));
    const limitedProducts = productsData.slice(0, limit);
    res.json(limitedProducts);
});

// Ruta para obtener un producto por su id
router.get('/:pid', (req, res) => {
    const { pid } = req.params;
    const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/productos.json')));
    const product = productsData.find(p => p.id === pid);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

// Ruta para agregar un nuevo producto
router.post('/', (req, res) => {
    const { title, description, code, price, stock, category, thumbnails = [] } = req.body;
    const newProduct = {
        id: Date.now().toString(),
        title,
        description,
        price,
        status: true,
        stock,
        category,
        thumbnails
    };

    const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/productos.json')));
    productsData.push(newProduct);
    fs.writeFileSync(path.join(__dirname, '../data/productos.json'), JSON.stringify(productsData, null, 2));

    res.status(201).json(newProduct);
});

// Ruta para actualizar un producto
router.put('/:pid', (req, res) => {
    const { pid } = req.params;
    const updatedProduct = req.body;
    const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/productos.json')));

    const index = productsData.findIndex(p => p.id === pid);
    if (index !== -1) {
        const product = productsData[index];
        const updated = { ...product, ...updatedProduct, id: product.id };
        productsData[index] = updated;
        fs.writeFileSync(path.join(__dirname, '../data/productos.json'), JSON.stringify(productsData, null, 2));
        res.json(updated);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

// Ruta para eliminar un producto
router.delete('/:pid', (req, res) => {
    const { pid } = req.params;
    let productsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/productos.json')));

    const index = productsData.findIndex(p => p.id === pid);
    if (index !== -1) {
        productsData = productsData.filter(p => p.id !== pid);
        fs.writeFileSync(path.join(__dirname, '../data/productos.json'), JSON.stringify(productsData, null, 2));
        res.json({ message: 'Producto eliminado' });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

module.exports = router;
