import { X, Pill, AlertTriangle, Info, Clock } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const MedicineDetailsModal = ({ medicine, isOpen, onClose }) => {
  const { t } = useLanguage();

  if (!isOpen || !medicine) return null;

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
              {getTypeIcon(medicine.type)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {medicine.name}
              </h2>
              <span className="text-sm text-gray-600">{medicine.type}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Info className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Description & Usage
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {medicine.description}
            </p>
          </div>

          {/* Dosage */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Clock className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Recommended Dosage
              </h3>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium">{medicine.dosage}</p>
            </div>
          </div>

          {/* Side Effects */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Possible Side Effects
              </h3>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-orange-800">{medicine.sideEffects}</p>
            </div>
          </div>

          {/* Precautions */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Precautions & Warnings
              </h3>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{medicine.precautions}</p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              <strong>Disclaimer:</strong> This information is for educational
              purposes only and should not replace professional medical advice.
              Always consult with a healthcare provider before starting any new
              medication.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetailsModal;