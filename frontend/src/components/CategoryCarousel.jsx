import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const rotateRight = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
  };

  const rotateLeft = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + categories.length) % categories.length
    );
  };

  useEffect(() => {
    const interval = setInterval(rotateRight, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto my-20 h-96">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-72 h-72 rounded-full border-4 border-indigo-500">
          {categories.map((category, index) => {
            const angle =
              ((index - currentIndex) / categories.length) * 2 * Math.PI;
            const x = Math.cos(angle) * 120;
            const y = Math.sin(angle) * 120;
            return (
              <motion.div
                key={category}
                className="absolute w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center cursor-pointer"
                style={{
                  left: "calc(50% - 3rem)",
                  top: "calc(50% - 3rem)",
                }}
                animate={{
                  x,
                  y,
                  scale: index === currentIndex ? 1.2 : 1,
                  zIndex: index === currentIndex ? 10 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={() => searchJobHandler(category)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-white text-xs font-bold text-center">
                  {category}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, y: direction > 0 ? 50 : -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: direction > 0 ? -50 : 50 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-4xl font-bold text-indigo-500">
            {categories[currentIndex]}
          </h2>
        </motion.div>
      </AnimatePresence>
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-indigo-500 text-white p-2 rounded-full"
        onClick={rotateLeft}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-indigo-500 text-white p-2 rounded-full"
        onClick={rotateRight}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default CategoryCarousel;
