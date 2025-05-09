import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useProducts } from "../context/ProductContext";
import Loader from "../components/loader/Loader";
import { fadeInUp } from "../utils/animations";
import SearchBar from "../components/SearchBar";
import CategorySortControls from "../components/CategorySortControls";
import ProductGrid from "../components/ProductGrid";
import LoadMoreButton from "../components/LoadMoreButton";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import ThemeToggle from "../components/theme/ThemeToggle";

function Home() {
  const {
    products,
    loading,
    query,
    page,
    setQuery,
    setPage,
    setCategory,
    category,
    cart,
    getTotalQuantity,
  } = useProducts();

  const loadMoreRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();
  const totalQty = getTotalQuantity();
  const { favorites } = useProducts();

  useEffect(() => {
    setCategories([
      { id: "chocolates", name: "Chocolates" },
      { id: "biscuits", name: "Biscuits" },
      { id: "juices", name: "Juices" },
      { id: "milk", name: "Milk" },
      { id: "snacks", name: "Snacks" },
      { id: "pizzas", name: "Pizzas" },
      { id: "cheeses", name: "Cheeses" },
      { id: "breakfast-cereals", name: "Breakfast Cereals" },
      { id: "sauces", name: "Sauces" },
      { id: "teas", name: "Teas" },
    ]);
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "name-asc")
      return (a.product_name || "").localeCompare(b.product_name || "");
    if (sortOption === "name-desc")
      return (b.product_name || "").localeCompare(a.product_name || "");
    if (sortOption === "grade-asc")
      return (a.nutrition_grades_tags?.[0] || "").localeCompare(
        b.nutrition_grades_tags?.[0] || ""
      );
    if (sortOption === "grade-desc")
      return (b.nutrition_grades_tags?.[0] || "").localeCompare(
        a.nutrition_grades_tags?.[0] || ""
      );
    return 0;
  });

  return (
    <div className=" min-h-screen max-w-full mx-auto bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-90 shadow-lg p-6 sm:p-10 text-blue-700 dark:text-emerald-400">
      <div className="max-w-6xl mx-auto rounded-2xl shadow-lg p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <motion.h1
            className="text-4xl sm:text-5xl font-extrabold"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            NutriExplorer
          </motion.h1>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/favorites")}
              className="relative bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-3 rounded-full hover:shadow transition cursor-pointer"
            >
              <FaHeart className="text-xl text-red-500" />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="relative bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-3 rounded-full hover:shadow transition cursor-pointer"
            >
              <FaShoppingCart className=" text-xl" />
              {totalQty > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalQty}
                </span>
              )}
            </button>

            <ThemeToggle />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-black dark:text-white mb-6">
          <div className="relative w-full sm:w-[300px] md:w-[400px] lg:w-[500px]">
            <SearchBar
              setQuery={setQuery}
              setPage={setPage}
              setCategory={setCategory}
            />
          </div>
          
          <CategorySortControls
            categories={categories}
            category={category}
            setCategory={setCategory}
            setQuery={setQuery}
            setPage={setPage}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
        </div>

        {loading && page === 1 ? (
          <Loader />
        ) : sortedProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <ProductGrid products={sortedProducts} />
        )}

        {loading && page > 1 && <Loader />}

        {products.length > 0 && !loading && (
          <LoadMoreButton
            loadMoreRef={loadMoreRef}
            onClick={() => setPage((prev) => prev + 1)}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
