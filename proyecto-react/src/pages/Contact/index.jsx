import React, { useState } from 'react';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    alert('Mensaje enviado');
    setFormData({ name: '', email: '', message: '' }); 
  };

  return (
    <div className="contact-container">
      <h1>Contacto</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Nombre:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Correo Electrónico:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Mensaje:
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit" className="submit-button">Enviar</button>
      </form>
    </div>
  );
};

export default Contact;
