import React from 'react';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2024 ToMan. Todos los derechos reservados.</p>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
        <div className="contact-info">
          <p>Email: ToManShop@gmail.com</p>
          <p>Teléfono: (123) 456-7890</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
