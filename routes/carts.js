const express = require('express');
const router = express.Router();
const fs = require('fs');  //Use fs porque se me hiso mas facil
const path = require('path');

// Ruta para crear un nuevo carrito
router.post('/', (req, res) => {
    const newCart = {
        id: Date.now().toString(),
        products: []
    };

    const cartsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/carrito.json')));
    cartsData.push(newCart);
    fs.writeFileSync(path.join(__dirname, '../data/carrito.json'), JSON.stringify(cartsData, null, 2));

    res.status(201).json(newCart);
});

// Ruta para listar los productos en un carrito
router.get('/:cid', (req, res) => {
    const { cid } = req.params;
    const cartsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/carrito.json')));
    const cart = cartsData.find(c => c.id === cid);

    if (cart) {
        res.json(cart.products);
    } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
});

// Ruta para agregar un producto al carrito
router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const cartsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/carrito.json')));
    const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/productos.json')));

    const cart = cartsData.find(c => c.id === cid);
    const product = productsData.find(p => p.id === pid);

    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const existingProduct = cart.products.find(p => p.product === pid);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.products.push({ product: pid, quantity: 1 });
    }

    fs.writeFileSync(path.join(__dirname, '../data/carrito.json'), JSON.stringify(cartsData, null, 2));

    res.status(201).json(cart);
});

module.exports = router;
