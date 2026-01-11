import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext.jsx';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { isLogIn } = useContext(AuthContext);

  const fetchCart = async () => {
    try {
      const res = await axios.get('http://localhost:5000/Trendify/orders/cart', { withCredentials: true });
      setCartItems(res.data.cartItems);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    if (isLogIn) {
      fetchCart();
    }
  }, [isLogIn]);

  const removeFromCart = async (orderId) => {
    try {
      await axios.post(`http://localhost:5000/Trendify/orders/cart/delete/${orderId}`, {}, { withCredentials: true });
      fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="grid gap-4">
            {cartItems.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow-md p-4 flex items-center">
                <img
                  src={`http://localhost:5000/${order.item.productPic}`}
                  alt={order.item.name}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800">{order.item.name}</h2>
                  <p className="text-gray-600">{order.item.description}</p>
                  <p className="text-lg font-bold text-indigo-600">${order.item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(order._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;