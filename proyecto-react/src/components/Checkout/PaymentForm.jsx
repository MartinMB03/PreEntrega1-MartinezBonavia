import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import Swal from 'sweetalert2';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

const PaymentForm = ({ clearCart, navigate }) => {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const order = {
      number: state.number,
      expiry: state.expiry,
      cvc: state.cvc,
      name: state.name,
    };

    try {
      const docRef = await addDoc(collection(db, "orders"), order);
      const orderId = docRef.id;

      Swal.fire({
        title: 'Pago Realizado con Exito',
        text: ` Gracias por su compra!   ID de orden: ${orderId}.`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });

      clearCart();
      setState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
      });
      navigate('/'); 
    } catch (error) {
      console.error("Error al crear la orden: ", error); 
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al procesar tu pago. ' + error.message,
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  }

  return (
    <div className='payment-form'>
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="number"
          placeholder="Número de tarjeta"
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Nombre del titular"
          value={state.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          required
        />
        <input
          type="text"
          name="expiry"
          placeholder="MM/AA"
          value={state.expiry}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          required
        />
        <input
          type="number"
          name="cvc"
          placeholder="CVC"
          value={state.cvc}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          required
        />
        <button type="submit">Pagar</button>
      </form>
    </div>
  );
}

export default PaymentForm;
