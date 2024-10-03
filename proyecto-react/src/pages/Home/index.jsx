import React from 'react';


const Home = () => {
  const handleButtonClick = () => {
    
    window.location.href = '/tienda';
  };

  return (
    <div className="home">
      <header className="headerhome">
        <h1>Bienvenidos a </h1>
        
      </header>
      
      <div className="banner">
        <img src="/public/icon/banner1.jpeg" alt="Banner de ropa de hombres" />
      </div>
      <h2>Encuentra el estilo que te define.</h2>

      <button className="shop-button" onClick={handleButtonClick}>
        Ir a Tienda
      </button>
    </div>
  );
};

export default Home;
