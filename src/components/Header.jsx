import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useUser } from "../contexts/UserContext";
import LanguageToggle from "./LanguageToggle";
import { LogOut, User, Heart } from "lucide-react";
import LOGO from "../assets/LOGO.png";

const Header = () => {
  const { t } = useLanguage();
  const { currentUser, userType, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white w-screen fixed shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <img className="w-[100px]" src={LOGO} alt="" />
          </Link>

          <div className="flex items-center space-x-4">
            <LanguageToggle />

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
      </div>
    </header>
  );
};

export default Header;
