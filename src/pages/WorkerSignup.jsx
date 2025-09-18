import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useUser } from "../contexts/UserContext";
import { UserPlus } from "lucide-react";

const WorkerSignup = () => {
  const { t } = useLanguage();
  const { signupWorker } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    aadhar: "",
    abha: "",
  });

  const [idType, setIdType] = useState("aadhar"); // default Aadhaar
  const [error, setError] = useState("");

  const validateForm = () => {
    if (idType === "aadhar") {
      if (!/^\d{12}$/.test(formData.aadhar)) {
        setError("Aadhar number must be exactly 12 digits");
        return false;
      }
    } else if (idType === "abha") {
      if (!/^\d{14}$/.test(formData.abha)) {
        setError("ABHA ID must be exactly 14 digits");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    const success = signupWorker({
      aadhar: idType === "aadhar" ? formData.aadhar : "",
      abha: idType === "abha" ? formData.abha : "",
    });

    if (success) {
      navigate("/worker/dashboard");
    } else {
      setError("Registration failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, ""); // only digits
    setFormData((prev) => ({ ...prev, [name]: numericValue }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <UserPlus className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              {t("signup")}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Signup using Aadhaar or ABHA ID
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ID Type Toggle (same as login) */}
            <div className="flex space-x-4 mb-6">
              <button
                type="button"
                onClick={() => setIdType("aadhar")}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  idType === "aadhar"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {t("aadharNumber")}
              </button>
              <button
                type="button"
                onClick={() => setIdType("abha")}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  idType === "abha"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {t("abhaId")}
              </button>
            </div>

            {/* Aadhaar OR ABHA input */}
            {idType === "aadhar" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Aadhaar Number
                </label>
                <input
                  type="text"
                  name="aadhar"
                  value={formData.aadhar}
                  onChange={handleChange}
                  maxLength="12"
                  placeholder="123456789012"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">12 digits</p>
              </div>
            )}

            {idType === "abha" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ABHA ID
                </label>
                <input
                  type="text"
                  name="abha"
                  value={formData.abha}
                  onChange={handleChange}
                  maxLength="14"
                  placeholder="12345678901234"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">14 digits</p>
              </div>
            )}

            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              {t("signup")}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/worker/login"
                className="text-primary hover:text-primary-dark font-medium"
              >
                {t("login")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerSignup;
