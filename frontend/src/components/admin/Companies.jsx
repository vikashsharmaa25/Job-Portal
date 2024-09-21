import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Input, Button, Typography } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import Navbar from "../shared/Navbar";
import CompaniesTable from "./CompaniesTable";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { setSearchCompanyByText } from "@/redux/companySlice";

const { Title } = Typography;

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white bg-opacity-10 rounded-xl shadow-2xl overflow-hidden">
          <div className="px-6 py-8">
            <Title level={2} className="text-white mb-6">
              Companies
            </Title>
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0">
              <Input
                placeholder="Search companies"
                prefix={<SearchOutlined className="text-gray-400" />}
                onChange={(e) => setInput(e.target.value)}
                className="w-full md:w-1/2 lg:w-1/3 bg-white bg-opacity-20 border-0 text-white placeholder-gray-400"
                allowClear
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                onClick={() => navigate("/admin/companies/create")}
                className="bg-indigo-600 hover:bg-indigo-700 border-0 shadow-lg"
              >
                New Company
              </Button>
            </div>
            <div className="bg-white bg-opacity-5 rounded-lg p-4">
              <CompaniesTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
