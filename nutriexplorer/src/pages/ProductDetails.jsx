import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductByBarcode } from "../api/fetch";
import Loader from "../components/loader/Loader";
import { motion } from "framer-motion";
import { fadeInUp } from "../utils/animations";

function ProductDetails() {
  const { barcode } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const data = await fetchProductByBarcode(barcode);
      setProduct(data.product);
      setLoading(false);
    };
    getProduct();
  }, [barcode]);

  if (loading) return <Loader />;

  if (!product)
    return (
      <p className="text-center mt-10 text-lg text-gray-500">Product not found.</p>
    );

  return (
    <div className="bg-gray-900 dark:bg-white  mx-auto p-6 dark:text-emerald-400 text-blue-700">
      <Link
        to="/"
        className="hover:underline mb-6 inline-block text-lg text-center mx-auto"
      >
        ← Back to Home
      </Link>
      <motion.div
        className="dark:bg-gray-900 bg-white max-w-4xl mx-auto rounded-xl shadow-lg p-6 flex flex-col sm:flex-row gap-6"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <img
          src={product.image_url || "https://via.placeholder.com/150"}
          alt={product.product_name}
          className="w-full sm:w-1/3 h-64 object-contain rounded-md mb-4 sm:mb-0"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">
            {product.product_name || "Unnamed Product"}
          </h1>
          <p className="text-lg text-gray-600 dark:text-white mb-4">
            {product.brands || "Unknown Brand"}
          </p>

          {product.ingredients_text && (
            <div className="mb-4">
              <h2 className="font-semibold text-xl mb-2">Ingredients:</h2>
              <p className="text-sm text-gray-700 dark:text-white">
                {product.ingredients_text || "No ingredient info available"}
              </p>
            </div>
          )}

          {product.nutriments && (
            <div className="mb-4">
              <h2 className="font-semibold text-xl mb-2">Nutrition Values (per 100g):</h2>
              <ul className="text-sm text-gray-700 dark:text-white list-disc list-inside">
                <li>Energy: {product.nutriments["energy-kcal"] || "N/A"} kcal</li>
                <li>Fat: {product.nutriments?.fat || "N/A"} g</li>
                <li>Carbs: {product.nutriments.carbohydrates || "N/A"} g</li>
                <li>Proteins: {product.nutriments.proteins || "N/A"} g</li>
                <li>Salt: {product.nutriments.salt || "N/A"} g</li>
                <li>Sugars: {product.nutriments.sugars || "N/A"} g</li>
              </ul>
            </div>
          )}

          {product.labels && (
            <div>
              <h2 className="font-semibold text-xl mb-2">Labels:</h2>
              <p className="text-sm text-gray-700 dark:text-white">{product.labels || "No labels found"}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default ProductDetails;
