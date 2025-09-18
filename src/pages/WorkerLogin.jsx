import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useUser } from "../contexts/UserContext";
import Header from "../components/Header";
import { Eye, EyeOff, User, Lock } from "lucide-react";

const WorkerLogin = () => {
  const { t } = useLanguage();
  const { loginWorker } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loginType, setLoginType] = useState("aadhar"); // 'aadhar' or 'abha'

  const validateIdentifier = (identifier, type) => {
    if (type === "aadhar") {
      return /^\d{12}$/.test(identifier);
    } else if (type === "abha") {
      return /^\d{14}$/.test(identifier);
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!validateIdentifier(formData.identifier, loginType)) {
      setError(
        loginType === "aadhar"
          ? "Aadhar number must be exactly 12 digits"
          : "ABHA ID must be exactly 14 digits"
      );
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const success = loginWorker(formData.identifier, formData.password);
    if (success) {
      navigate("/worker/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "identifier") {
      // Only allow digits for identifier
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-teal-50">
      {/* Header on top */}

      {/* Centered login card */}
      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <User className="mx-auto h-12 w-12 text-primary" />
              <h2 className="mt-4 text-3xl font-bold text-gray-900">
                {t("workerLogin")}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Sign in to access your health records
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Login Type Toggle */}
              <div className="flex space-x-4 mb-6">
                <button
                  type="button"
                  onClick={() => setLoginType("aadhar")}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    loginType === "aadhar"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {t("aadharNumber")}
                </button>
                <button
                  type="button"
                  onClick={() => setLoginType("abha")}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    loginType === "abha"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {t("abhaId")}
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {loginType === "aadhar" ? t("aadharNumber") : t("abhaId")}
                </label>
                <input
                  type="text"
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  maxLength={loginType === "aadhar" ? 12 : 14}
                  placeholder={
                    loginType === "aadhar" ? "XXXXXXXXXXXX" : "XXXXXXXXXXXXXX"
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("password")}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center justify-center space-x-2"
              >
                <Lock className="w-4 h-4" />
                <span>{t("login")}</span>
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/worker/signup"
                  className="text-primary hover:text-primary-dark font-medium"
                >
                  {t("signup")}
                </Link>
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 font-medium mb-2">
                Demo Credentials:
              </p>
              <p className="text-xs text-blue-700">Aadhar: 123456789012</p>
              <p className="text-xs text-blue-700">ABHA: 12345678901234</p>
              <p className="text-xs text-blue-700">Password: password123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerLogin;
