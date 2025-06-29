import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Calendar, Activity, FileText, Stethoscope } from "lucide-react";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    medicalHistory: "",
    currentSymptoms: "",
    skinType: "",
    allergies: "",
  });
  const [userInfo, setUserInfo] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tempUser = localStorage.getItem("tempUser");
    if (tempUser) {
      setUserInfo(JSON.parse(tempUser));
    } else {
      navigate("/signup");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const completeUser = { ...userInfo, ...formData };

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: completeUser.firstName + " " + completeUser.lastName,
          email: completeUser.email,
          password: completeUser.password, // from step-1 signup
          // optionally send age, gender, etc. if your DB schema accepts
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("username", completeUser.firstName);
        localStorage.setItem("userProfile", JSON.stringify(completeUser));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.removeItem("tempUser");
        navigate("/dashboard");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!userInfo) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Stethoscope className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Complete Your Profile
            </h1>
            <p className="text-gray-600">
              Help us personalize your skin care experience,{" "}
              {userInfo.firstName}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-2" />
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your age"
                  required
                  min="1"
                  max="120"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline h-4 w-4 mr-2" />
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skin Type
              </label>
              <select
                name="skinType"
                value={formData.skinType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select your skin type</option>
                <option value="dry">Dry</option>
                <option value="oily">Oily</option>
                <option value="combination">Combination</option>
                <option value="sensitive">Sensitive</option>
                <option value="normal">Normal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Activity className="inline h-4 w-4 mr-2" />
                Current Symptoms (if any)
              </label>
              <textarea
                name="currentSymptoms"
                value={formData.currentSymptoms}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe any current skin concerns or symptoms..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="inline h-4 w-4 mr-2" />
                Medical History
              </label>
              <textarea
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any relevant medical history, medications, or previous skin conditions..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Known Allergies
              </label>
              <textarea
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="List any known allergies to medications, foods, or skincare ingredients..."
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Privacy Notice:</strong> Your health information is
                encrypted and secure. We follow HIPAA guidelines to protect your
                privacy.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
            >
              Complete Registration
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
