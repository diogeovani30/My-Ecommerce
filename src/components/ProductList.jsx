import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice'; 
import { useNavigate } from 'react-router-dom'; 

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleViewDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  let content;

  if (productStatus === 'loading') {
    content = <p className="text-center text-xl">Loading...</p>;
  } else if (productStatus === 'succeeded') {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-56 object-cover transform hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2 truncate">{product.title}</h3>
              <p className="text-gray-600 mb-1">${product.price.toFixed(2)}</p>
              <p className="text-gray-500 mb-4">Quantity: {product.quantity}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-300"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleViewDetails(product.id)}
                  className="bg-gray-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-300"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else if (productStatus === 'failed') {
    content = <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <section className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Products</h2>
      {content}
    </section>
  );
};

export default ProductList;
