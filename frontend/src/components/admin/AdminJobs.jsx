import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "antd";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black min-h-screen text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 p-5">
        <div className="flex items-center justify-between my-5">
          <input
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
            size="large"
            className="bg-transparent md:w-96 p-1 border border-gray-200 rounded-md"
          />
          <button
            type="primary"
            onClick={() => navigate("/admin/jobs/create")}
            className="px-4 py-1 border border-gray-200 rounded-md"
            size="large"
          >
            New Job
          </button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
