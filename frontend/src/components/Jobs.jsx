import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, Briefcase, DollarSign, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Explore Opportunities
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
            <FilterCard />
          </div>
          <div className="flex-1">
            {filterJobs.length <= 0 ? (
              <div className="text-center text-gray-400 py-20">
                <p className="text-2xl font-semibold">No jobs found</p>
                <p className="mt-2">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="space-y-6">
                <AnimatePresence>
                  {filterJobs.map((job) => (
                    <motion.div
                      key={job?._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-filter backdrop-blur-lg hover:bg-opacity-20 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
            <img
              src={job?.company?.logo}
              alt={job?.company?.name}
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{job?.title}</h2>
            <p className="text-gray-400">{job?.company?.name}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors duration-200">
          <Bookmark size={20} />
        </button>
      </div>
      <p className="text-gray-300 mb-4 line-clamp-2">{job?.description}</p>
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex items-center text-sm text-gray-400">
          <Briefcase size={16} className="mr-2" />
          {job?.jobType}
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <MapPin size={16} className="mr-2" />
          India
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <DollarSign size={16} className="mr-2" />
          {job?.salary} LPA
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <Clock size={16} className="mr-2" />
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-200"
        >
          View Details
        </button>
        <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors duration-200">
          Save For Later
        </button>
      </div>
    </div>
  );
};

export default Jobs;
