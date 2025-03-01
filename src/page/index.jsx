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
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-6">🛒 Магазин</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center"
          >
            <h2 className="text-lg font-medium">{product.name}</h2>
            <p className="text-gray-400">${product.price}</p>
            <button
              onClick={() => dispatch(addToCart(product))}
              className="mt-3 bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              ➕ Добавить
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-medium mt-8">🛍 Корзина</h2>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md mt-4 w-full max-w-4xl">
        {cart.items.length === 0 ? (
          <p className="text-gray-400 text-center">Корзина пуста</p>
        ) : (
          <>
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-gray-700 py-2"
              >
                <span>{item.name} x {item.quantity}</span>
                <span>${item.price * item.quantity}</span>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-400 hover:text-red-500"
                >
                  ❌
                </button>
              </div>
            ))}
            <h3 className="text-lg font-medium mt-4 text-right">
              Итого: ${cart.total}
            </h3>
          </>
        )}
      </div>
    </div>
  );
}
