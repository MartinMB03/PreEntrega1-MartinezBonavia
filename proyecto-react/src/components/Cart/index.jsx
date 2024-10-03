import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/cartContext';
import Modal from '../Modal/index'; 
import PaymentForm from '../Checkout/PaymentForm'; 
import { useNavigate } from 'react-router-dom'; 

const Cart = () => {
  const { cartItems, removeItem, clearCart } = useContext(CartContext); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); 

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePayment = () => {
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul>
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <img src={`/public/${item.img.front}`} alt={item.name} className="cart-item__image" />
                <span>{item.name}</span>
                <span>Cantidad: {item.quantity}</span>
                <span>Precio: $ {item.price.toFixed(2)}</span>
                <span>Total: $ {(item.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => removeItem(item.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <h3>Total: $ {totalAmount.toFixed(2)}</h3>
          <button className="cart-pay-button" onClick={handlePayment}>Pagar</button>
        </>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <PaymentForm clearCart={clearCart} navigate={navigate} /> 
      </Modal>
    </div>
  );
};

export default Cart;

