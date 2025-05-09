import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUp } from "../utils/animations";

function Favorites() {
  const { favorites } = useProducts();

  return (
    <div className="min-h-screen p-6 max-w-full dark:bg-gray-900 bg-white mx-auto dark:text-emerald-400 text-blue-700">
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
        className="text-3xl font-bold mb-6"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        Your Favorites
      </motion.h1>

      {favorites.length === 0 ? (
        <motion.p
          className=""
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          You have no favorite products yet.
        </motion.p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          {favorites.map((product) => (
            <Link key={product.code} to={`/product/${product.code}`}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
              >
                <ProductCard product={product} />
              </motion.div>
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default Favorites;
