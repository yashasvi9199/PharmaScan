import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg mb-6">
            <span className="text-4xl">💊</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            PharmaScan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Instantly identify medications from medicine strips using advanced 
            OCR and our comprehensive pharmaceutical database.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Scan Card */}
          <Link
            to="/scan"
            className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-indigo-200 transition-all"
          >
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
              <span className="text-2xl">📷</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Scan Medicine</h3>
            <p className="text-gray-600 text-sm">
              Upload a photo of your medicine strip to identify its contents
            </p>
          </Link>

          {/* History Card */}
          <Link
            to="/history"
            className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-indigo-200 transition-all"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">View History</h3>
            <p className="text-gray-600 text-sm">
              Access your previous scans and identified medications
            </p>
          </Link>

          {/* Lookup Card */}
          <Link
            to="/lookup"
            className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-indigo-200 transition-all"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Search Medicines</h3>
            <p className="text-gray-600 text-sm">
              Look up any medicine by name in our database
            </p>
          </Link>
        </div>

        {/* How it Works */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                1
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Upload Image</h4>
              <p className="text-sm text-gray-600">
                Take a clear photo of your medicine strip or packaging
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                2
              </div>
              <h4 className="font-medium text-gray-900 mb-2">OCR Processing</h4>
              <p className="text-sm text-gray-600">
                Our system extracts text using advanced image recognition
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                3
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Get Results</h4>
              <p className="text-sm text-gray-600">
                View identified medicines with ATC codes and details
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-8">
          <Link
            to="/scan"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transition-all"
          >
            Start Scanning
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
