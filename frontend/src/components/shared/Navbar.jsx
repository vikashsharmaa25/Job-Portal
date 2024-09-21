import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Dropdown, Avatar, Button } from "antd";
import { UserOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const menu = (
    <Menu className="bg-gray-800 text-white">
      {user && user.role === "student" && (
        <Menu.Item key="profile" icon={<UserOutlined />}>
          <Link to="/profile">View Profile</Link>
        </Menu.Item>
      )}
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logoutHandler}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <nav className="bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-widest">
                Job<span className="text-[#F83002]">Portal</span>
              </h1>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-4">
              {user && user.role === "recruiter" ? (
                <>
                  <Link
                    to="/admin/companies"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Companies
                  </Link>
                  <Link
                    to="/admin/jobs"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Jobs
                  </Link>
                  <Link
                    to="/browse"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Contact us
                  </Link>
                  <Link
                    to="/browse"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    About us
                  </Link>
                  <Link
                    to="/browse"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Portfolio
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    to="/jobs"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Jobs
                  </Link>
                  <Link
                    to="/browse"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Contact us
                  </Link>
                  <Link
                    to="/browse"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    About us
                  </Link>
                  <Link
                    to="/browse"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Portfolio
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="hidden md:block">
            {!user ? (
              <div className="ml-4 flex items-center md:ml-6">
                <Link to="/login">
                  <Button
                    type="link"
                    className="text-gray-300 hover:text-white"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    type="primary"
                    className="ml-3 bg-[#F83002] border-[#F83002] hover:bg-[#D62A02] hover:border-[#D62A02]"
                  >
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <Dropdown overlay={menu} placement="bottomRight" arrow>
                <Avatar
                  src={user?.profile?.profilePhoto}
                  icon={<UserOutlined />}
                  className="cursor-pointer bg-gray-300"
                />
              </Dropdown>
            )}
          </div>
          <div className="md:hidden">
            <Button
              type="text"
              icon={<MenuOutlined className="text-white text-2xl" />}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user && user.role === "recruiter" ? (
              <>
                <Link
                  to="/admin/companies"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Companies
                </Link>
                <Link
                  to="/admin/jobs"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Jobs
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/jobs"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Jobs
                </Link>
                <Link
                  to="/browse"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Browse
                </Link>
              </>
            )}
            {!user ? (
              <div className="mt-3 space-y-2">
                <Link to="/login">
                  <Button
                    type="link"
                    className="w-full text-left text-gray-300 hover:text-white"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    type="primary"
                    className="w-full bg-[#F83002] border-[#F83002] hover:bg-[#D62A02] hover:border-[#D62A02]"
                  >
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="mt-3 space-y-2">
                {user.role === "student" && (
                  <Link
                    to="/profile"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    View Profile
                  </Link>
                )}
                <Button
                  type="link"
                  className="w-full text-left text-gray-300 hover:text-white"
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
