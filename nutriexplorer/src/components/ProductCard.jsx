import { useProducts } from "../context/ProductContext";
import {
  FaHeart,
  FaRegHeart,
  FaShoppingCart,
  FaPlus,
  FaMinus,
} from "react-icons/fa";

function ProductCard({ product }) {
  const {
    toggleFavorite,
    isFavorited,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
  } = useProducts();

  const cartItem = cart.find((item) => item.code === product.code);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    if (!cartItem) addToCart(product);
  };

  const handleIncrease = () => {
    updateQuantity(product.code, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity === 1) {
      removeFromCart(product.code);
    } else {
      updateQuantity(product.code, quantity - 1);
    }
  };

  return (
    <div className="relative bg-gray-900 dark:bg-white rounded-xl shadow-md p-4 flex flex-col h-full transition-transform hover:scale-105 text-emerald-400 dark:text-blue-700">
      <img
        src={product.image_url || "https://via.placeholder.com/150"}
        alt={product.product_name}
        className="w-full h-40 object-cover rounded-md mb-3"
      />

      <div className="flex justify-between items-start mb-1 h-12">
        <h2 className="text-base font-semibold line-clamp-2 max-w-[85%]">
          {product.product_name || "Unnamed Product"}
        </h2>
        <button
          className="text-red-500"
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(product);
          }}
        >
          {isFavorited(product.code) ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-1">
        {product.brands || "Unknown Brand"}
      </p>

      {product.nutrition_grades_tags && (
        <p className="text-xs mt-auto mb-3">
          Nutrition Grade: {product.nutrition_grades_tags[0].toUpperCase()}
        </p>
      )}

      {quantity === 0 ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            handleAdd();
          }}
          className="mt-2 dark:bg-blue-600 bg-emerald-500 text-white dark:hover:bg-blue-700 hover:bg-emerald-600 transition px-4 py-2 rounded-full flex items-center justify-center gap-2 text-sm"
        >
          <FaShoppingCart /> Add to Cart
        </button>
      ) : (
        <div className="flex items-center justify-center gap-3 mt-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleDecrease();
            }}
            className="w-8 h-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
          >
            <FaMinus className="mx-auto" />
          </button>
          <span className="text-sm font-medium">{quantity}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleIncrease();
            }}
            className="w-8 h-8 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
          >
            <FaPlus className="mx-auto" />
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
