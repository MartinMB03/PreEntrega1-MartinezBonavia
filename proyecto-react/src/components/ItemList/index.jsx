import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore"; 
import { db } from '../../config/firebase'; 
import Item from "../Item";

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsCollection = collection(db, "ecommerce-ropa");
        const itemSnapshot = await getDocs(itemsCollection);
        const itemList = itemSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(itemList);
      } catch (err) {
        console.error('Error fetching items:', err);
      }
    };

    fetchItems();
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
