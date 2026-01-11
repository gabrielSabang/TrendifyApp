import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { AuthContext } from './context/authContext.jsx'

const LandingPage = () => {
  const navigate = useNavigate()
  const { isLogIn } = useContext(AuthContext)

  useEffect(() => {
    if (isLogIn) {
      navigate('/user/shop')
    }
  }, [isLogIn, navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      
      

      <main className="flex flex-1 items-center px-10">
        <div className="max-w-xl">
          <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Sell Your Products.  
            <span className="text-blue-600"> Trend with Students.</span>
          </h2>

          <p className="mt-6 text-gray-600 text-lg">
            Trendify is a student marketplace where college students can sell
            their products, showcase creativity, and connect with fellow students.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate('/register')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Start Selling
            </button>
            <button
              onClick={() => navigate('/login')}
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
            >
              Explore Products
            </button>
          </div>
        </div>
      </main>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 pb-16">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg text-gray-800">🎓 Student-Only Marketplace</h3>
          <p className="text-gray-600 mt-2">
            Built exclusively for college students to buy and sell safely.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg text-gray-800">🚀 Grow Your Brand</h3>
          <p className="text-gray-600 mt-2">
            Promote your products and build your student business easily.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg text-gray-800">💬 Simple & Secure</h3>
          <p className="text-gray-600 mt-2">
            Easy listings, smooth checkout, and secure user accounts.
          </p>
        </div>
      </section>

      <footer className="text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} Trendify. Built for students.
      </footer>
    </div>
  )
}

export default LandingPage
