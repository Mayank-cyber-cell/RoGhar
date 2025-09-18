import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useUser } from "../contexts/UserContext";
import Header from "../components/Header";
import {
  TestTube,
  Plus,
  Calendar,
  Download,
  Upload,
  ArrowLeft,
} from "lucide-react";

const TestReports = () => {
  const { t } = useLanguage();
  const { currentUser, getWorkerTestReports, addTestReport } = useUser();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReport, setNewReport] = useState({
    type: "",
    results: "",
    date: new Date().toISOString().split("T")[0],
    reportUrl: "",
  });

  const testReports = getWorkerTestReports(currentUser?.id || 1);

  const reportTypes = [
    "Blood Test",
    "X-Ray",
    "MRI",
    "CT Scan",
    "Ultrasound",
    "ECG",
    "Urine Test",
    "Other",
  ];

  const handleAddReport = (e) => {
    e.preventDefault();
    addTestReport(newReport);
    setNewReport({
      type: "",
      results: "",
      date: new Date().toISOString().split("T")[0],
      reportUrl: "",
    });
    setShowAddForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReport((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // For demo purposes, we'll just create a mock URL
      const mockUrl = `#report-${Date.now()}`;
      setNewReport((prev) => ({ ...prev, reportUrl: mockUrl }));
    }
  };

  const getReportTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case "blood test":
        return "🩸";
      case "x-ray":
        return "🦴";
      case "mri":
        return "🧠";
      case "ct scan":
        return "💀";
      case "ultrasound":
        return "👶";
      case "ecg":
        return "❤️";
      case "urine test":
        return "🧪";
      default:
        return "📋";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex mt-[10vh] items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/worker/dashboard"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t("testReports")}
              </h1>
              <p className="text-gray-600">View and manage your test results</p>
            </div>
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>{t("uploadReport")}</span>
          </button>
        </div>

        {/* Reports List */}
        <div className="space-y-6">
          {testReports.length > 0 ? (
            testReports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                      {getReportTypeIcon(report.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {report.type}
                      </h3>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{report.date}</span>
                      </div>
                    </div>
                  </div>

                  {report.reportUrl && (
                    <button className="flex items-center space-x-1 text-primary hover:text-primary-dark text-sm font-medium">
                      <Download className="w-4 h-4" />
                      <span>{t("downloadReport")}</span>
                    </button>
                  )}
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Results</h4>
                  <p className="text-gray-700">{report.results}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <TestTube className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Test Reports
              </h3>
              <p className="text-gray-600 mb-6">
                You don't have any test reports yet. Upload your first report to
                get started.
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Upload First Report
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Report Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t("uploadReport")}
            </h3>

            <form onSubmit={handleAddReport} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("reportType")}
                </label>
                <select
                  name="type"
                  value={newReport.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Select report type</option>
                  {reportTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("reportDate")}
                </label>
                <input
                  type="date"
                  name="date"
                  value={newReport.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Results/Summary
                </label>
                <textarea
                  name="results"
                  value={newReport.results}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter test results or summary..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Report File (Optional)
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <Upload className="w-4 h-4" />
                    <span className="text-sm">Choose File</span>
                  </label>
                  {newReport.reportUrl && (
                    <span className="text-sm text-green-600">
                      File selected
                    </span>
                  )}
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {t("cancel")}
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  {t("save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestReports;
