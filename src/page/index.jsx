import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } from "../components/cartSlice";

const products = [
  { id: 1, name: "iPhone 15", price: 1200 },
  { id: 2, name: "MacBook Air", price: 1800 },
  { id: 3, name: "AirPods Pro", price: 250 },
];

export default function Home() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-8 text-blue-400 tracking-wide">
        🛒 Магазин
      </h1>

      {/* Продукты */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center"
          >
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-400 text-lg">${product.price}</p>
            <button
              onClick={() => dispatch(addToCart(product))}
              className="mt-4 bg-blue-500 px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-md"
            >
              ➕ Добавить
            </button>
          </div>
        ))}
      </div>

      {/* Корзина */}
      <h2 className="text-3xl font-bold mt-10 text-yellow-400 tracking-wide">
        🛍 Корзина
      </h2>
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-6 w-full max-w-5xl transition-all duration-300">
        {cart.items.length === 0 ? (
          <p className="text-gray-400 text-center text-lg">Корзина пуста 😢</p>
        ) : (
          <>
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-gray-700 py-3 hover:bg-gray-700 px-4 rounded-lg transition-all duration-200"
              >
                <span className="text-lg font-medium">{item.name}</span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => dispatch(decrementQuantity(item.id))}
                    className="bg-gray-700 px-3 py-1 rounded-lg hover:bg-gray-600 transition"
                  >
                    ➖
                  </button>
                  <span className="text-lg font-bold">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(incrementQuantity(item.id))}
                    className="bg-gray-700 px-3 py-1 rounded-lg hover:bg-gray-600 transition"
                  >
                    ➕
                  </button>
                </div>
                <span className="text-lg font-semibold text-green-400">
                  ${item.price * item.quantity}
                </span>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-400 hover:text-red-500 text-lg"
                >
                  ❌
                </button>
              </div>
            ))}
            <h3 className="text-2xl font-semibold mt-6 text-right text-green-300">
              Итого: ${cart.total}
            </h3>
            <button
              onClick={() => dispatch(clearCart())}
              className="mt-4 w-full bg-red-600 px-6 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 shadow-md text-white"
            >
              🗑 Очистить корзину
            </button>
          </>
        )}
      </div>
    </div>
  );
}
