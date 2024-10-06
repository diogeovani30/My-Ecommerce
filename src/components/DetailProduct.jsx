import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

const DetailProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.items.find((item) => item.id === parseInt(productId))
  );

  if (!product) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-center text-red-500 font-semibold">
          Product not found.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all duration-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-all duration-300"
      >
        Back to Products
      </button>
      <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden">
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">
              {product.title}
            </h2>
            <p className="text-2xl text-green-600 mb-4">${product.price.toFixed(2)}</p>
            <p className="text-md text-gray-500 mb-2">Quantity Available: {product.quantity}</p>
            <p className="text-md text-gray-700">
              {product.description
                ? product.description
                : 'No description available for this product.'}
            </p>
            <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-6 py-3 mt-4 rounded hover:bg-blue-700 transition-all duration-300 text-lg font-medium"
          >
            Add to Cart
          </button>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
