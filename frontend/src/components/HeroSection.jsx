import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Briefcase, TrendingUp, Building } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black min-h-screen flex items-center text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="lg:pr-12">
            <h2 className="text-base font-semibold text-indigo-400 tracking-wide uppercase mb-4">
              No. 1 Job Hunt Website
            </h2>
            <h1 className="text-5xl font-extrabold sm:text-6xl lg:text-7xl tracking-tight leading-tight mb-6">
              Discover
              <br />
              Your{" "}
              <span className="text-indigo-500">
                Dream
                <br />
                Career
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Unlock endless possibilities and find the perfect job that aligns
              with your passion and skills.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <Input
                type="text"
                placeholder="Search for your dream job..."
                className="flex-grow rounded-full px-6 py-4 bg-white bg-opacity-10 text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button
                onClick={searchJobHandler}
                className="w-full sm:w-auto rounded-full px-8 py-4 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Search className="h-5 w-5 mr-2" />
                Search Jobs
              </Button>
            </div>
          </div>
          <div className="lg:pl-12 space-y-8">
            <div className="bg-white bg-opacity-5 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <Briefcase className="h-8 w-8 text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Diverse Opportunities
              </h3>
              <p className="text-gray-300">
                Explore a wide range of job openings across various industries
                and roles.
              </p>
            </div>
            <div className="bg-white bg-opacity-5 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300 ml-12">
              <TrendingUp className="h-8 w-8 text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
              <p className="text-gray-300">
                Find opportunities that align with your career goals and
                aspirations.
              </p>
            </div>
            <div className="bg-white bg-opacity-5 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <Building className="h-8 w-8 text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Top Companies</h3>
              <p className="text-gray-300">
                Connect with leading organizations and start-ups in your field.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
