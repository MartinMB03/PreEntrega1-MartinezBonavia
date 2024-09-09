import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const ItemsDetails = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch('/src/data/items.json')
      .then(res => res.json())
      .then(data => {
        const foundProduct = data.find(p => p.id === parseInt(id));
        setProduct(foundProduct);
      })
      .catch(err => console.error('Error fetching product details:', err)); 
  }, [id]);

  const handleAddToCart = () => {
    console.log('Producto añadido al carrito:', product);
  };

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <div className="item-details">
      <div className="item-details__images">
        <img src={`/public/${product.img.front}`} alt={`${product.name} - Figura`} />
        <img src={`/public/${product.img.back}`} alt={`${product.name} - Caja`} />
      </div>
      <div className="item-details__info">
        <h2>{product.name}</h2>
        <h3>{product.category}</h3>
        <p>$ {product.price} .-</p>
        <p>{product.dues} CUOTAS SIN INTERÉS</p>
        {product.description && <p>{product.description}</p>}
        <button className="item-details__add-to-cart" onClick={handleAddToCart}>
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default ItemsDetails;
