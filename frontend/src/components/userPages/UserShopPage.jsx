import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext.jsx';

const UserShopPage = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const { isLogIn } = useContext(AuthContext);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/Trendify/products');
      setProducts(res.data.products || res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    if (!isLogIn) {
      alert('Please log in to add items to cart');
      return;
    }
    try {
      await axios.post(`http://localhost:5000/Trendify/orders/cart/${productId}`, {}, { withCredentials: true });
      alert('Added to cart!');
      fetchProducts();
      nextProduct();
    } catch (error) {
      console.error('Error adding to cart:', error);
      const message = error.response?.data?.message || 'Failed to add to cart';
      alert(message);
    }
  };

  const nextProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      nextProduct();
    }
    if (isRightSwipe) {
      if (products[currentIndex]) {
        addToCart(products[currentIndex]._id);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      nextProduct();
    } else if (e.key === 'ArrowRight') {
      if (products[currentIndex]) {
        addToCart(products[currentIndex]._id);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, products]);

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">No products available!</h2>
          <p className="text-gray-500 mt-2">Check back later for new items.</p>
        </div>
      </div>
    );
  }

  const currentProduct = products[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Discover Products</h1>
      <p className="text-gray-500 mb-6 text-center">Swipe or click to navigate. Left: Next product, Right: Buy and next.</p>
      <div className="relative w-full max-w-md mx-auto">
        <div
          className="bg-white rounded-2xl shadow-2xl border border-indigo-100 overflow-hidden flex flex-col"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative h-64">
            <img
              className="w-full h-full object-cover"
              src={`http://localhost:5000/${currentProduct.productPic}`}
              alt={currentProduct.name}
            />
            <div className="absolute top-4 right-4 bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              ${currentProduct.price}
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">{currentProduct.name}</h2>
              <p className="text-gray-600 mb-2">{currentProduct.description}</p>
              <p className="text-gray-500 text-sm">Sold by: {currentProduct.owner?.name || 'Unknown Seller'}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={nextProduct}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 text-2xl"
          >
            ✕
          </button>
          <button
            onClick={() => addToCart(currentProduct._id)}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 text-2xl"
          >
            ✓
          </button>
        </div>
        <div className="text-center mt-4 text-gray-500">
          Product {currentIndex + 1} of {products.length}
        </div>
      </div>
    </div>
  );
};

export default UserShopPage;
