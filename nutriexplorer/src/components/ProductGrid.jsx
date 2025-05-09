import { motion } from "framer-motion";
import { fadeInUp } from "../utils/animations";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {products.map((product, index) => (
      <motion.div
        key={product.code || index}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={index * 0.05}
      >
        <Link to={`/product/${product.code || "unknown"}`}>
          <ProductCard product={product} />
        </Link>
      </motion.div>
    ))}
  </div>
);

export default ProductGrid;