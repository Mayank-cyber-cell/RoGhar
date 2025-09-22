import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useUser } from "../contexts/UserContext";
import LanguageToggle from "./LanguageToggle";
import { LogOut, User, Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import LOGO from "../assets/LOGO.png";

const Header = () => {
  const { t } = useLanguage();
  const { currentUser, userType, logout } = useUser();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navigationItems = [
    { path: "/mockup-dashboard", label: t("mockupDashboard") },
    { path: "/hospital-map", label: t("hospitalMap") },
    { path: "/qr-generator", label: t("qrGenerator") },
    { path: "/security", label: t("whySafe") },
    { path: "/blog-faq", label: t("blogFaq") },
    { path: "/prototype-showcase", label: t("prototypeShowcase") }
  ];

  return (
    <header className="bg-white w-screen fixed shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <img className="w-[100px]" src={LOGO} alt="" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm text-gray-700 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <LanguageToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {currentUser ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {currentUser.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-800"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t("logout")}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/worker/login"
                  className="text-sm text-primary hover:text-primary-dark"
                >
                  {t("workerLogin")}
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                  to="/doctor/login"
                  className="text-sm text-primary hover:text-primary-dark"
                >
                  {t("doctorLogin")}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm text-gray-700 hover:text-primary transition-colors px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
