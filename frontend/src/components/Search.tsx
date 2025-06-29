import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Upload,
  Search as SearchIcon,
  Camera,
  FileText,
  AlertCircle,
  CheckCircle,
  Stethoscope,
  ArrowLeft,
  Loader2,
} from "lucide-react";

const Search: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [symptoms, setSymptoms] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalysis = async () => {
    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      setResults({
        condition: "Mild Eczema",
        confidence: 87,
        description:
          "Based on the image and symptoms, this appears to be mild atopic dermatitis (eczema). The affected area shows characteristic inflammation and dryness.",
        recommendations: [
          "Apply fragrance-free moisturizer twice daily",
          "Use gentle, hypoallergenic cleansers",
          "Avoid known triggers like harsh soaps",
          "Consider consulting a dermatologist if symptoms persist",
        ],
        severity: "mild",
        followUp:
          "Monitor symptoms for 1-2 weeks. Consult a dermatologist if condition worsens.",
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setImagePreview("");
    setSymptoms("");
    setResults(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm">
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
                AI Skin Scanner
              </span>
            </div>
            <div></div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!results ? (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                AI Skin Analysis
              </h1>
              <p className="text-gray-600">
                Upload a clear photo of your skin concern and describe your
                symptoms for AI-powered analysis
              </p>
            </div>

            {/* Image Upload */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Upload Skin Image
              </label>

              {!imagePreview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    Click to upload or drag and drop your image here
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer inline-block transition-colors"
                  >
                    Choose Image
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    Supported formats: JPG, PNG, HEIC (Max 10MB)
                  </p>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Uploaded skin image"
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview("");
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            {/* Symptoms Input */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                <FileText className="inline h-4 w-4 mr-2" />
                Describe Your Symptoms
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Please describe what you're experiencing: itching, redness, pain, when it started, any triggers you've noticed..."
              />
            </div>

            {/* Analysis Button */}
            <div className="text-center">
              <button
                onClick={handleAnalysis}
                disabled={!selectedImage && !symptoms.trim()}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center mx-auto"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <SearchIcon className="h-5 w-5 mr-2" />
                    Analyze Skin Condition
                  </>
                )}
              </button>

              {!selectedImage && !symptoms.trim() && (
                <p className="text-sm text-gray-500 mt-2">
                  Please upload an image or describe symptoms to continue
                </p>
              )}
            </div>

            {/* Disclaimer */}
            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-yellow-800">
                  <strong>Important:</strong> This AI analysis is for
                  informational purposes only and should not replace
                  professional medical advice. Always consult with a qualified
                  dermatologist for proper diagnosis and treatment.
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Results */
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Analysis Results
                </h2>
                <button
                  onClick={resetAnalysis}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  New Analysis
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Detected Condition
                  </h3>
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h4 className="text-xl font-bold text-blue-900 mb-2">
                      {results.condition}
                    </h4>
                    <div className="flex items-center mb-2">
                      <span className="text-sm text-blue-700">
                        Confidence Level:
                      </span>
                      <span className="ml-2 font-semibold text-blue-900">
                        {results.confidence}%
                      </span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${results.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {results.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Recommendations
                  </h3>
                  <div className="space-y-3">
                    {results.recommendations.map(
                      (rec: string, index: number) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{rec}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Next Steps</h4>
                <p className="text-gray-700">{results.followUp}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                What would you like to do next?
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  to="/doctors"
                  className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  Book Dermatologist Appointment
                </Link>
                <button className="border-2 border-blue-600 text-blue-600 p-4 rounded-lg hover:bg-blue-50 transition-colors">
                  Save to Health Records
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
