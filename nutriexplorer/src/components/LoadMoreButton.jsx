import { motion } from "framer-motion";
import { fadeInUp } from "../utils/animations";

const LoadMoreButton = ({ onClick, loadMoreRef }) => (
  <motion.div
    className="flex justify-center mt-10"
    initial="hidden"
    animate="visible"
    variants={fadeInUp}
    custom={0.3}
    ref={loadMoreRef}
  >
    <button
      className="bg-blue-600 dark:bg-emerald-500 text-white py-2 px-6 rounded-full hover:bg-blue-700 dark:hover:bg-emerald-600 transition shadow-md"
      onClick={onClick}
    >
      Load More
    </button>
  </motion.div>
);

export default LoadMoreButton;
