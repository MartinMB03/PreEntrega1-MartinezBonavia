import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import Item from "../Item";

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/src/data/items.json')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error('Error fetching items:', err)); // Manejo de errores
  }, []);

  return (
    <section className="items__container container">
      {items.map(item => (
        <Link 
          to={`/product/${item.id}`} 
          key={item.id} 
          className="item-link"
        >
          <Item {...item} tag="NUEVO" />
        </Link>
      ))}
    </section>
  );
}

export default ItemList;
