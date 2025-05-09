import { motion } from "framer-motion";

const SkeletonCard = () => (
  <motion.div
    className="relative w-full sm:w-64 h-40 border border-gray-300 p-4 bg-gray-200 overflow-hidden rounded-lg shadow"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <motion.div
      className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-gray-300 to-transparent"
      animate={{ x: ["-100%", "100%"] }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        ease: "linear",
      }}
    />
    <div className="relative z-10 flex flex-col gap-2">
      <div className="w-12 h-12 rounded-full bg-gray-400" />
      <div className="w-24 h-2 bg-gray-400 ml-14 mt-[-44px]" />
      <div className="w-36 h-2 bg-gray-400 ml-14 mt-2" />
      <div className="w-full h-2 bg-gray-400 mt-4" />
      <div className="w-11/12 h-2 bg-gray-400" />
    </div>
  </motion.div>
);

const Loader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 justify-center">
      {[...Array(3)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default Loader;
