import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Form, Input, Radio, Upload, message, Spin, Button } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { FaUserGraduate, FaUserTie } from "react-icons/fa";
import { setLoading } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";

const Signup = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const onFinish = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key !== "file") {
        formData.append(key, values[key]);
      }
    });

    if (fileList.length > 0) {
      formData.append("file", fileList[0].originFileObj);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      message.error(
        error.response?.data?.message || "An error occurred during signup"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8 bg-white px-10 rounded-2xl shadow-2xl transition-transform duration-500 ease-in-out transform pb-5">
        <div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900 tracking-wider">
            Create your account
          </h2>
        </div>
        <Form
          form={form}
          name="signup"
          onFinish={onFinish}
          layout="vertical"
          className="mt-8 space-y-6"
        >
          <Form.Item
            name="fullname"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-500" />}
              placeholder="Full Name"
              className="rounded-md py-2 px-4 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-500" />}
              placeholder="Email"
              className="rounded-md py-2 px-4 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            rules={[
              { required: true, message: "Please input your phone number!" },
              {
                pattern: /^\d{10}$/,
                message: "Please enter a valid 10-digit phone number!",
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined className="text-gray-500" />}
              placeholder="Phone Number"
              className="rounded-md py-2 px-4 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              {
                min: 8,
                message: "Password must be at least 8 characters long!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-500" />}
              placeholder="Password"
              className="rounded-md py-2 px-4 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </Form.Item>
          <Form.Item
            name="role"
            rules={[{ required: true, message: "Please select your role!" }]}
          >
            <Radio.Group className="flex justify-around">
              <Radio
                value="student"
                className="flex items-center text-gray-600"
              >
                <FaUserGraduate className="mr-2" /> Student
              </Radio>
              <Radio
                value="recruiter"
                className="flex items-center text-gray-600"
              >
                <FaUserTie className="mr-2" /> Recruiter
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <div className="w-full border border-[#313131] text-center rounded-lg">
              <Upload
                beforeUpload={() => false}
                maxCount={1}
                listType="picture"
                accept="image/*"
                onChange={handleFileChange}
                fileList={fileList}
                className="w-full"
              >
                <button className=" flex justify-center py-1 px-4 text-black rounded-md text-center">
                  Upload Profile Picture
                </button>
              </Upload>
            </div>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-2 px-4 text-white bg-[#313131] rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              disabled={loading}
            >
              {loading ? <Spin /> : "Sign Up"}
            </Button>
          </Form.Item>
        </Form>
        <div className="text-sm text-center">
          <Link
            to="/login"
            className="font-medium text-gray-600 hover:text-gray-500"
          >
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
