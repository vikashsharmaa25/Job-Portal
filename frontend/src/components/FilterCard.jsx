import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Briefcase, DollarSign, ChevronDown } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    icon: <MapPin size={24} />,
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    icon: <Briefcase size={24} />,
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    icon: <DollarSign size={24} />,
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const [selectedValues, setSelectedValues] = useState({});
  const [expandedSection, setExpandedSection] = useState(null);
  const dispatch = useDispatch();

  const changeHandler = (filterType, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? null : value,
    }));
  };

  useEffect(() => {
    const query = Object.values(selectedValues).filter(Boolean).join(" ");
    dispatch(setSearchedQuery(query));
  }, [selectedValues, dispatch]);

  return (
    <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-filter backdrop-blur-lg transition-all duration-300">
      <h1 className="font-bold text-3xl mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
        Refine Your Search
      </h1>
      {filterData.map((data, index) => (
        <motion.div
          key={data.filterType}
          initial={false}
          animate={{
            backgroundColor:
              expandedSection === data.filterType
                ? "rgba(255,255,255,0.1)"
                : "rgba(255,255,255,0)",
          }}
          className="mb-4 rounded-lg overflow-hidden"
        >
          <motion.button
            className="w-full px-4 py-3 flex items-center justify-between text-left"
            onClick={() =>
              setExpandedSection(
                expandedSection === data.filterType ? null : data.filterType
              )
            }
          >
            <span className="flex items-center">
              {React.cloneElement(data.icon, {
                className: "mr-3 text-purple-400",
              })}
              <span className="font-semibold text-lg">{data.filterType}</span>
            </span>
            <motion.span
              animate={{
                rotate: expandedSection === data.filterType ? 180 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={20} />
            </motion.span>
          </motion.button>
          <AnimatePresence>
            {expandedSection === data.filterType && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-4 py-2 space-y-2">
                  {data.array.map((item) => (
                    <motion.button
                      key={item}
                      onClick={() => changeHandler(data.filterType, item)}
                      className={`w-full text-left px-4 py-2 rounded-md transition-all duration-200 ${
                        selectedValues[data.filterType] === item
                          ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                          : "bg-white bg-opacity-10 hover:bg-opacity-20"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default FilterCard;
