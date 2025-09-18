import { Pill, Info, AlertTriangle, Clock } from "lucide-react";
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
            {getTypeIcon(medicine.type)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {medicine.name}
            </h3>
            <span
              className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(
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
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
            {medicine.description}
          </p>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span className="font-medium">Dosage:</span>
          <span>{medicine.dosage}</span>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <button
            onClick={() => onViewDetails(medicine)}
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center space-x-2 text-sm font-medium"
          >
            <Info className="w-4 h-4" />
            <span>View Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;