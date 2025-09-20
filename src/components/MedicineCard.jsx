import { Pill, Info, AlertTriangle, Clock, Sparkles } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const MedicineCard = ({ medicine, onViewDetails }) => {
  const { t } = useLanguage();

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case "tablet":
        return "💊";
      case "capsule":
        return "💊";
      case "syrup":
        return "🍯";
      case "injection":
        return "💉";
      case "cream":
        return "🧴";
      case "drops":
        return "💧";
      default:
        return "💊";
    }
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case "tablet":
        return "bg-blue-100 text-blue-800";
      case "capsule":
        return "bg-green-100 text-green-800";
      case "syrup":
        return "bg-orange-100 text-orange-800";
      case "injection":
        return "bg-red-100 text-red-800";
      case "cream":
        return "bg-purple-100 text-purple-800";
      case "drops":
        return "bg-cyan-100 text-cyan-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 group relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-bl-full opacity-50 group-hover:opacity-70 transition-opacity"></div>
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:shadow-md transition-shadow relative">
            {getTypeIcon(medicine.type)}
            <Sparkles className="w-3 h-3 text-blue-500 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
              {medicine.name}
            </h3>
            <span
              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getTypeColor(
                medicine.type
              )}`}
            >
              {medicine.type}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {medicine.description}
          </p>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-500 bg-gray-50 rounded-lg p-2">
          <Clock className="w-4 h-4" />
          <span className="font-semibold text-gray-700">Dosage:</span>
          <span className="text-gray-600">{medicine.dosage}</span>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <button
            onClick={() => onViewDetails(medicine)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <Info className="w-4 h-4" />
            <span>View Full Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;