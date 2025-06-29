import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Star,
  Calendar,
  Clock,
  Phone,
  Stethoscope,
  Search,
  Filter,
  Award,
  Users,
} from "lucide-react";

const Doctors: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      specialty: "Dermatology & Cosmetic Surgery",
      rating: 4.9,
      reviews: 156,
      experience: "15+ years",
      location: "Mumbai",
      address: "Breach Candy Hospital, Mumbai",
      image:
        "https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg",
      available: "Today",
      fee: "₹1,200",
      nextSlot: "2:30 PM",
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      specialty: "Pediatric Dermatology",
      rating: 4.8,
      reviews: 203,
      experience: "12+ years",
      location: "Delhi",
      address: "AIIMS, New Delhi",
      image:
        "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg",
      available: "Tomorrow",
      fee: "₹1,000",
      nextSlot: "10:00 AM",
    },
    {
      id: 3,
      name: "Dr. Priya Sharma",
      specialty: "Dermatopathology",
      rating: 4.9,
      reviews: 184,
      experience: "18+ years",
      location: "Pune",
      address: "Ruby Hall Clinic, Pune",
      image:
        "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg",
      available: "Today",
      fee: "₹1,500",
      nextSlot: "4:00 PM",
    },
    {
      id: 4,
      name: "Dr. Amit Patel",
      specialty: "Mohs Surgery & Skin Cancer",
      rating: 4.7,
      reviews: 142,
      experience: "20+ years",
      location: "Mumbai",
      address: "Kokilaben Hospital, Mumbai",
      image:
        "https://images.pexels.com/photos/5327647/pexels-photo-5327647.jpeg",
      available: "Today",
      fee: "₹2,000",
      nextSlot: "11:30 AM",
    },
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesCity = !selectedCity || doctor.location === selectedCity;
    const matchesSearch =
      !searchTerm ||
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                Find Doctors
              </span>
            </div>
            <div></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Find Best Dermatologists
          </h1>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors or specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="">All Cities</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Pune">Pune</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>

            <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
              <Filter className="h-5 w-5" />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {filteredDoctors.length} doctors found
            {selectedCity && ` in ${selectedCity}`}
          </h2>
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Sort by Relevance</option>
            <option>Highest Rated</option>
            <option>Lowest Fee</option>
            <option>Earliest Available</option>
          </select>
        </div>

        {/* Doctors List */}
        <div className="space-y-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="grid md:grid-cols-4 gap-6 items-center">
                <div className="md:col-span-2 flex items-start space-x-4">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {doctor.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-2">
                      {doctor.specialty}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-1" />
                        {doctor.experience}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        {doctor.rating} ({doctor.reviews} reviews)
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {doctor.address}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
                    Available {doctor.available}
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    <Clock className="inline h-4 w-4 mr-1" />
                    Next: {doctor.nextSlot}
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {doctor.fee}
                  </div>
                  <div className="text-sm text-gray-500">Consultation Fee</div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No doctors found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or location
            </p>
          </div>
        )}

        {/* Emergency Banner */}
        <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="bg-red-100 p-2 rounded-full mr-4">
              <Phone className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-1">
                Emergency?
              </h3>
              <p className="text-red-700 mb-2">
                For urgent skin conditions, contact our 24/7 helpline or visit
                the nearest emergency room.
              </p>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                Call Emergency Helpline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
