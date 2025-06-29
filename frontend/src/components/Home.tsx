import React from "react";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  Search,
  Calendar,
  Users,
  Shield,
  Star,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">
                SkinDerma
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a
                href="#services"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Services
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Contact
              </a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-2">
              <a href="#services" className="block py-2 text-gray-700">
                Services
              </a>
              <a href="#about" className="block py-2 text-gray-700">
                About
              </a>
              <a href="#contact" className="block py-2 text-gray-700">
                Contact
              </a>
              <Link to="/login" className="block py-2 text-gray-700">
                Log In
              </Link>
              <Link
                to="/signup"
                className="block py-2 text-blue-600 font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Skin Health,
              <span className="text-blue-600 block">Our Priority</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Advanced AI-powered skin diagnosis, expert dermatologist
              consultations, and comprehensive skin care solutions - all in one
              platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/search"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-600 hover:text-white transition-all"
              >
                Try Diagnosis Tool
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Skin Care Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for optimal skin health, powered by
              cutting-edge technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                AI Skin Analysis
              </h3>
              <p className="text-gray-600 mb-4">
                Upload photos for instant AI-powered skin condition analysis
                with 95% accuracy
              </p>
              <Link
                to="/search"
                className="text-blue-600 font-medium flex items-center"
              >
                Try Now <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-2xl hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="bg-teal-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Book Appointments
              </h3>
              <p className="text-gray-600 mb-4">
                Connect with certified dermatologists in your area with easy
                online booking
              </p>
              <Link
                to="/doctors"
                className="text-teal-600 font-medium flex items-center"
              >
                Find Doctors <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Community Support
              </h3>
              <p className="text-gray-600 mb-4">
                Join our supportive community to share experiences and get
                advice
              </p>
              <Link
                to="/community"
                className="text-green-600 font-medium flex items-center"
              >
                Join Community <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Trusted by Thousands for Skin Health
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our platform combines advanced AI technology with expert medical
                knowledge to provide accurate skin condition assessments and
                connect you with qualified dermatologists.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Shield className="h-6 w-6 text-green-600 mr-3" />
                  <span className="text-gray-700">
                    HIPAA compliant and secure
                  </span>
                </div>
                <div className="flex items-center">
                  <Star className="h-6 w-6 text-yellow-500 mr-3" />
                  <span className="text-gray-700">
                    4.9/5 rating from 10,000+ users
                  </span>
                </div>
                <div className="flex items-center">
                  <Stethoscope className="h-6 w-6 text-blue-600 mr-3" />
                  <span className="text-gray-700">
                    Validated by board-certified dermatologists
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-teal-100 p-8 rounded-2xl">
              <img
                src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg"
                alt="Medical consultation"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600">
              Have questions? We're here to help you on your skin health
              journey.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-2xl">
            <form className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="First Name"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <textarea
                rows={5}
                placeholder="Your Message"
                className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="md:col-span-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Stethoscope className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">SkinDerma</span>
            </div>
            <p className="text-gray-400 text-center md:text-right">
              © 2025 SkinDerma. All rights reserved. | Privacy Policy | Terms of
              Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
