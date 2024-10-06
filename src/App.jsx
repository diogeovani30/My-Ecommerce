import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import DetailProduct from './components/DetailProduct';
import Cart from './components/Cart';
import Navbar from './components/Navbar';
import Login from './components/Login';
// import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute'; 

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:productId" element={<DetailProduct />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
          
      </Routes>
    </Router>
  );
};

export default App;
