import { useProducts } from "../context/ProductContext";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUp } from "../utils/animations";

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalQuantity } =
    useProducts();

  const totalItems = getTotalQuantity();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center dark:bg-gray-900 bg-white dark:text-emerald-400 text-blue-700">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <Link to="/" className="hover:underline text-lg text-left pl-6 mt-4">
            ← Back to Home
          </Link>
        </motion.div>
        <div className="flex justify-center items-center flex-grow">
          <motion.p
            className="text-xl"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            Your cart is empty.
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-full min-h-screen mx-auto p-6 dark:bg-gray-900 bg-white dark:text-emerald-400 text-blue-700">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <Link
          to="/"
          className="hover:underline mb-6 inline-block text-lg text-center mx-auto"
        >
          ← Back to Home
        </Link>
      </motion.div>

      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        Your Cart
      </motion.h1>

      {cart.map((item) => (
        <motion.div
          key={item.code}
          className="flex items-center gap-4 mb-4 p-4 rounded shadow"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <img
            src={item.image_url || "https://via.placeholder.com/100"}
            alt={item.product_name}
            className="w-20 h-20 object-cover rounded"
          />
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{item.product_name}</h2>
            <p className="text-sm">{item.brands}</p>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() =>
                  item.quantity === 1
                    ? removeFromCart(item.code)
                    : updateQuantity(item.code, item.quantity - 1)
                }
                className="p-1 rounded bg-red-100 hover:bg-red-200 text-red-600"
              >
                <FaMinus />
              </button>
              <span className="px-2">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.code, item.quantity + 1)}
                className="p-1 rounded bg-green-100 hover:bg-green-200 text-green-600"
              >
                <FaPlus />
              </button>
              <button
                onClick={() => removeFromCart(item.code)}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </motion.div>
      ))}

      <motion.div
        className="mt-6 flex justify-between items-center"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <p className="text-lg font-semibold">Total Items: {totalItems}</p>
        <button
          onClick={clearCart}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Clear Cart
        </button>
      </motion.div>
    </div>
  );
}

export default Cart;
