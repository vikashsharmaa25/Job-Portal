import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { Form, Input, Radio, Button, Spin } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

const Login = () => {
  const [form] = Form.useForm();
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const submitHandler = async (values) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, values, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during login"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl transition-transform duration-500 ease-in-out transform">
        <div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900 tracking-wider">
            Login to your account
          </h2>
        </div>
        <Form
          form={form}
          name="login"
          onFinish={submitHandler}
          layout="vertical"
          className="mt-8 space-y-6"
        >
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
                Student
              </Radio>
              <Radio
                value="recruiter"
                className="flex items-center text-gray-600"
              >
                Recruiter
              </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-2 px-4 text-white bg-[#313131] rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              disabled={loading}
            >
              {loading ? <Spin /> : "Login"}
            </Button>
          </Form.Item>
        </Form>
        <div className="text-sm text-center">
          <Link
            to="/signup"
            className="font-medium text-gray-600 hover:text-gray-500"
          >
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
