import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      <main className="flex flex-1 items-center px-10">
        <div className="max-w-xl">
          <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Welcome to Trendify
            <span className="text-blue-600"> - Your Student Marketplace</span>
          </h2>

          <p className="mt-6 text-gray-600 text-lg">
            Discover, buy, and sell products within your student community.
            Connect with fellow students and find great deals!
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate('/register')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate('/login')}
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
            >
              Sign In
            </button>
          </div>
        </div>
      </main>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 pb-16">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg text-gray-800">🛒 Shop Smart</h3>
          <p className="text-gray-600 mt-2">
            Browse a wide variety of products from your peers.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg text-gray-800">💰 Sell Easily</h3>
          <p className="text-gray-600 mt-2">
            List your items and reach thousands of students.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg text-gray-800">🤝 Community Focused</h3>
          <p className="text-gray-600 mt-2">
            Safe, secure transactions within your university network.
          </p>
        </div>
      </section>

      <footer className="text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} Trendify. Connecting students everywhere.
      </footer>
    </div>
  );
};

export default HomePage;