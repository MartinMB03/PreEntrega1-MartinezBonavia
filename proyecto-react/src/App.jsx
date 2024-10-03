import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/cartContext';
import BaseLayout from "./layout/BaseLayout";
import ItemList from "./components/ItemList";
import ItemsDetails from "./components/ItemsDetails";
import Home from './pages/home';
import Contact from './pages/contact';
import Cart from './components/Cart';
import PaymentForm from './components/Checkout/PaymentForm';
import Footer from './components/Footer';


function App() {
  return (
   
  <CartProvider>
    <BrowserRouter>
      <BaseLayout>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/tienda" element={<ItemList/>}/>
            <Route path="/product/:id" element={<ItemsDetails/>}/>
            <Route path="/contacto" element={<Contact/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/checkout" element={<PaymentForm/>}/>
            <Route path="*" element={ <h1>Pagina No Encontrada</h1>}/>
        </Routes>
        <Footer/>
      </BaseLayout>
   </BrowserRouter>
  </CartProvider>
  );
}

export default App;
