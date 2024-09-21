import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Empty, Typography, Tag, Tooltip } from "antd";
import {
  DollarCircleOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black py-16">
      <div className="container mx-auto px-4">
        <Title className="text-4xl font-bold text-center mb-12 text-white">
          <span className="text-blue-400 ">Latest & Top</span> Job Openings
        </Title>
        {allJobs.length <= 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span className="text-white">No Jobs Available</span>}
            className="mt-16"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allJobs?.slice(0, 6).map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-gray-200 border-opacity-20 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
      onClick={() => navigate(`/description/${job._id}`)}
    >
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <Title level={4} className="text-white mb-1">
            {job?.title}
          </Title>
          <Text className="text-gray-300 text-sm">{job?.company?.name}</Text>
        </div>
        <Text className="text-gray-400 mb-4 flex-grow">{job?.description}</Text>
        <div className="flex flex-wrap gap-2 mt-auto">
          <Tooltip title="Positions Available">
            <Tag color="blue" icon={<ClockCircleOutlined />}>
              {job?.position} Positions
            </Tag>
          </Tooltip>
          <Tooltip title="Job Type">
            <Tag color="volcano" icon={<EnvironmentOutlined />}>
              {job?.jobType}
            </Tag>
          </Tooltip>
          <Tooltip title="Salary">
            <Tag color="purple" icon={<DollarCircleOutlined />}>
              {job?.salary} LPA
            </Tag>
          </Tooltip>
        </div>
      </div>
    </Card>
  );
};

export default LatestJobs;
