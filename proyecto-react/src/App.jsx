import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BaseLayout from "./layout/BaseLayout";
import ItemList from "./components/ItemList";
import ItemsDetails from "./components/ItemsDetails";

function App() {
  return (
    <Router>
      <BaseLayout>
        <main>
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/product/:id" element={<ItemsDetails />} />
          </Routes>
        </main>
      </BaseLayout>
    </Router>
  );
}

export default App;
