import { motion } from "framer-motion";
import { fadeInUp } from "../utils/animations";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ setQuery, setPage, setCategory }) => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setQuery(e.target.value);
      setPage(1);
      setCategory("");
    }
  };

  return (
    <motion.div
      className="relative w-full sm:w-[300px] md:w-[400px] lg:w-[500px]"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      custom={0.2}
    >
      <input
        type="text"
        placeholder="Search for food products..."
        className="w-full px-4 py-2 pr-10 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onKeyDown={handleSearch}
      />
      <button
        type="button"
        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-blue-600"
        onClick={() => navigate("/scan")}
        aria-label="Scan Barcode"
      >
        <FaCamera />
      </button>
    </motion.div>
  );
};

export default SearchBar;
