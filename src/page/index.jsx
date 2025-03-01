import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, applyDiscount, checkout, setCurrency } from "../components/cartSlice";
import { useState, useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart) || {};
  const [coupon, setCoupon] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);

  const exchangeRates = cart.exchangeRates || { USD: 1, KZT: 450, EUR: 0.9 };
  const totalWithDiscount = Number(cart.total || 0) * (1 - (cart.discount || 0));
  const convertedTotal = (totalWithDiscount * (exchangeRates[cart.currency] || 1)).toFixed(2);

  useEffect(() => {
    if (cart.currency) {
      document.querySelector("select").value = cart.currency;
    }
  }, [cart.currency]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-8 text-blue-400">
        🛒 Магазин <span className="text-yellow-300">({cart.items?.length || 0})</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {[{ id: 1, name: "iPhone 15", price: 1200 }, { id: 2, name: "MacBook Air", price: 1800 }, { id: 3, name: "Ipod Air", price: 2000 }].map((product) => (
          <div key={product.id} className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-400">${product.price}</p>
            <button onClick={() => dispatch(addToCart({ ...product }))} className="mt-4 bg-blue-500 px-6 py-2 rounded-lg">
              ➕ Добавить
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold mt-10 text-yellow-400">🛍 Корзина</h2>
      <div className="bg-gray-800 p-6 rounded-xl mt-6 w-full max-w-5xl">
        {cart.items?.length === 0 ? (
          <p className="text-gray-400 text-center text-lg">Корзина пуста 😢</p>
        ) : (
          <>
            {cart.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b border-gray-700 py-3">
                <span className="text-lg font-medium">{item.name} x {item.quantity}</span>
                <span className="text-lg font-semibold text-green-400">${(item.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => dispatch(removeFromCart(item.id))} className="text-red-400">❌</button>
              </div>
            ))}
            <h3 className="text-xl mt-4 text-right">Скидка: {cart.discount * 100}%</h3>
            <h3 className="text-2xl font-semibold mt-2 text-right text-green-300">
              Итого: {convertedTotal} {cart.currency}
            </h3>

            <div className="flex mt-4">
              <input
                type="text"
                placeholder="Введите купон"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="bg-gray-700 p-2 rounded-md w-full text-black"
              />
              <button onClick={() => dispatch(applyDiscount(coupon))} className="ml-2 bg-green-500 px-4 py-2 rounded-lg">
                ✅ Применить
              </button>
            </div>

            <div className="mt-4">
              <select
                onChange={(e) => dispatch(setCurrency(e.target.value))}
                className="bg-gray-700 p-2 rounded-md"
              >
                <option value="USD">USD ($)</option>
                <option value="KZT">KZT (₸)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>

            <button
              onClick={() => {
                dispatch(checkout());
                setOrderSuccess(true);
                setTimeout(() => setOrderSuccess(false), 3000);
              }}
              className="mt-4 w-full bg-green-600 px-6 py-2 rounded-lg"
            >
              💳 Оплатить
            </button>

            {orderSuccess && <p className="text-green-400 text-center mt-4">✅ Заказ оформлен!</p>}
          </>
        )}
      </div>
    </div>
  );
}
