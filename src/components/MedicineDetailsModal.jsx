import { X, Pill, AlertTriangle, Info, Clock, Sparkles, Shield } from "lucide-react";
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
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center text-3xl relative">
              {getTypeIcon(medicine.type)}
              <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">
                {medicine.name}
              </h2>
              <span className="text-lg text-blue-100 font-medium">{medicine.type}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors ml-4"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Description */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Info className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Description & Usage
              </h3>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <p className="text-gray-700 leading-relaxed text-lg">
              {medicine.description}
            </p>
            </div>
          </div>

          {/* Dosage */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Recommended Dosage
              </h3>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <p className="text-green-800 font-semibold text-lg">{medicine.dosage}</p>
            </div>
          </div>

          {/* Side Effects */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Possible Side Effects
              </h3>
            </div>
            <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
              <p className="text-orange-800 text-lg">{medicine.sideEffects}</p>
            </div>
          </div>

          {/* Precautions */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Precautions & Warnings
              </h3>
            </div>
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <p className="text-red-800 text-lg">{medicine.precautions}</p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-gray-200 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Medical Disclaimer</p>
                <p className="text-sm text-gray-600 leading-relaxed">
              <strong>Disclaimer:</strong> This information is for educational
              purposes only and should not replace professional medical advice.
              Always consult with a healthcare provider before starting any new
              medication.
            </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-4 px-6 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetailsModal;