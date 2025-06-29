import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Calendar,
  Search,
  MessageCircle,
  Settings,
  LogOut,
  Camera,
  Bot,
  Heart,
  History,
  ShoppingBag,
  Bell,
  Stethoscope,
  Menu,
  X,
} from "lucide-react";

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const userProfile = localStorage.getItem("userProfile");
    const username = localStorage.getItem("username");

    if (userProfile) {
      setUser(JSON.parse(userProfile));
    } else if (username) {
      setUser({ firstName: username });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("userProfile");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Stethoscope className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">
                  SkinDerma
                </span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Bell className="h-6 w-6 text-gray-400 hover:text-gray-600 cursor-pointer" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-gray-700 font-medium">
                  Hi, {user.firstName || user.username}
                </span>
              </div>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-gray-700 font-medium">
                  Hi, {user.firstName || user.username}
                </span>
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>

              <nav className="space-y-2">
                <a
                  href="#"
                  className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Appointments</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                >
                  <History className="h-5 w-5" />
                  <span>Search History</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>Products</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                >
                  <Heart className="h-5 w-5" />
                  <span>Health Records</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user.firstName}!
              </h1>
              <p className="text-gray-600">
                Ready to take care of your skin health today?
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">
                      Skin Scans
                    </p>
                    <p className="text-2xl font-bold text-blue-900">12</p>
                  </div>
                  <Camera className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-teal-600 text-sm font-medium">
                      Appointments
                    </p>
                    <p className="text-2xl font-bold text-teal-900">3</p>
                  </div>
                  <Calendar className="h-8 w-8 text-teal-600" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">
                      Health Score
                    </p>
                    <p className="text-2xl font-bold text-green-900">85%</p>
                  </div>
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link
                to="/search"
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 group"
              >
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  AI Skin Scanner
                </h3>
                <p className="text-gray-600 text-sm">
                  Upload photos for instant analysis
                </p>
              </Link>

              <Link
                to="/doctors"
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 group"
              >
                <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-200 transition-colors">
                  <Calendar className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Book Appointment
                </h3>
                <p className="text-gray-600 text-sm">
                  Find and book dermatologists
                </p>
              </Link>

              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 group cursor-pointer">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <Bot className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  AI Health Assistant
                </h3>
                <p className="text-gray-600 text-sm">
                  Chat with our AI dermatologist
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 group cursor-pointer">
                <div className="bg-pink-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-pink-200 transition-colors">
                  <Heart className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Skin Care Plans
                </h3>
                <p className="text-gray-600 text-sm">
                  Personalized treatment plans
                </p>
              </div>

              <Link
                to="/community"
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 group"
              >
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Community
                </h3>
                <p className="text-gray-600 text-sm">Connect with others</p>
              </Link>

              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 group cursor-pointer">
                <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                  <ShoppingBag className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Products
                </h3>
                <p className="text-gray-600 text-sm">
                  Recommended skincare products
                </p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Camera className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Skin scan completed
                    </p>
                    <p className="text-xs text-gray-600">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-teal-50 rounded-lg">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <Calendar className="h-4 w-4 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Appointment booked with Dr. Smith
                    </p>
                    <p className="text-xs text-gray-600">Yesterday</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
