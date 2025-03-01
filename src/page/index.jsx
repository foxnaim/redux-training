import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../components/cartSlice";

const products = [
  { id: 1, name: "iPhone 15", price: 1200 },
  { id: 2, name: "MacBook Air", price: 1800 },
  { id: 3, name: "AirPods Pro", price: 250 },
];

export default function Home() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-400">
        🛒 Магазин
      </h1>

      {/* Продукты */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 p-5 rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
          >
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <p className="text-lg text-gray-300">${product.price}</p>
            <button
              onClick={() => dispatch(addToCart(product))}
              className="mt-3 bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
            >
              ➕ Добавить в корзину
            </button>
          </div>
        ))}
      </div>

      {/* Корзина */}
      <h2 className="text-3xl font-bold mt-10 text-center text-yellow-400">
        🛍 Корзина
      </h2>
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg mt-6">
        {cart.items.length === 0 ? (
          <p className="text-gray-400 text-center">Корзина пуста 😢</p>
        ) : (
          <>
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-gray-600 py-3"
              >
                <span className="text-lg">
                  {item.name} x {item.quantity}
                </span>
                <span className="text-lg font-semibold text-green-400">
                  ${item.price * item.quantity}
                </span>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700 transition duration-200 shadow-md"
                >
                  ❌
                </button>
              </div>
            ))}
            <h3 className="text-2xl font-semibold mt-6 text-right text-green-300">
              Итого: ${cart.total}
            </h3>
          </>
        )}
      </div>
    </div>
  );
}
