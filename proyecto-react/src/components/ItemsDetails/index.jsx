import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../context/cartContext';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../config/firebase'; 

const ItemsDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); 
  const { addItem } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = doc(db, "ecommerce-ropa", id); 
        const productSnapshot = await getDoc(productDoc);
        
        if (productSnapshot.exists()) {
          setProduct({ id: productSnapshot.id, ...productSnapshot.data() });
        } else {
          console.error("Producto no encontrado");
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
      }
    };

    fetchProduct();
  }, [id]);

  const increase = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrease = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1)); 
  };

  const addToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        img: product.img,
        price: product.price,
        description: product.description,
        category: product.category,
        quantity,
      });
      setQuantity(1);
    }
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
        <div className="item-detail__form--container">
          <button className="item-detail__form--btn" type="button" onClick={decrease}>-</button>
          <input
            className="item-detail__form--input"
            type="text"
            value={quantity}
            readOnly
          />
          <button className="item-detail__form--btn" type="button" onClick={increase}>+</button>
        </div>
        <button className="item-details__add-to-cart" onClick={addToCart}>
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default ItemsDetails;
