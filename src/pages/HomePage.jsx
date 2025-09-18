import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import Header from "../components/Header";
import {
  Users,
  Stethoscope,
  Calendar,
  FileText,
  Heart,
  Shield,
  Pill,
} from "lucide-react";

const HomePage = () => {
  const { t } = useLanguage();

  return (
    <div
      style={{ fontFamily: "'Roboto', sans-serif" }}
      className="min-h-screen flex justify-center bg-gradient-to-br from-green-50 to-teal-50"
    >
      <main className="mx-auto  px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {t("Welcome to Roghar")}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Ek Kadam Swasth Jeevan Ki Ore - Aapka Digital Health Companion.
          </p>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Get Started Today
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of migrant workers who trust our platform for their
            healthcare needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/worker/signup"
              className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center space-x-2"
            >
              <Users className="w-5 h-5" />
              <span>{t("Worker Signup")}</span>
            </Link>
            <Link
              to="/doctor/signup"
              className="bg-secondary text-white px-8 py-4 rounded-lg font-semibold hover:bg-secondary-dark transition-colors flex items-center justify-center space-x-2"
            >
              <Stethoscope className="w-5 h-5" />
              <span>{t("Doctor Signup")}</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
