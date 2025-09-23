import { useLanguage } from "../contexts/LanguageContext";
import { Globe } from "lucide-react";

const LanguageToggle = () => {
  const { language, changeLanguage, t } = useLanguage();

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center space-x-2">
        <select
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
          className="bg-white w-[10vw] md:w-full border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="en">{t("english")}</option>
          <option value="hi">{t("hindi")}</option>
          <option value="ml">{t("malayalam")}</option>
          <option value="bn">{t("bengali")}</option>
        </select>
      </div>
    </div>
  );
};

export default LanguageToggle;
