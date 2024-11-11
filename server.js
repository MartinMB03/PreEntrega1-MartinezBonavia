const express = require('express');
const app = express();
const fs = require('fs');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

// Middleware para parsear el body de las solicitudes en JSON
app.use(express.json());

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Configuración del puerto
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
