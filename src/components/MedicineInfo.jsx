import { useState, useMemo } from "react";
import { Search, Filter, Pill, AlertCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import {
  medicineDatabase,
  medicineTypes,
  searchMedicines,
  filterMedicinesByType,
} from "../data/medicineData";
import MedicineCard from "./MedicineCard";
import MedicineDetailsModal from "./MedicineDetailsModal";

const MedicineInfo = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter and search medicines
  const filteredMedicines = useMemo(() => {
    let medicines = medicineDatabase;
    
    // Apply type filter first
    medicines = filterMedicinesByType(selectedType, medicines);
    
    // Then apply search
    medicines = searchMedicines(searchQuery, medicines);
    
    return medicines;
  }, [searchQuery, selectedType]);

  const handleViewDetails = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMedicine(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Pill className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-gray-900">
              Medicine Information
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search and learn about common medications, their uses, dosages, and
            important safety information.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search medicines by name or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div className="lg:w-64">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                >
                  {medicineTypes.map((type) => (
                    <option key={type} value={type}>
                      {type === "All" ? "All Types" : type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            {filteredMedicines.length > 0 ? (
              <span>
                Showing {filteredMedicines.length} medicine
                {filteredMedicines.length !== 1 ? "s" : ""}
                {searchQuery && ` for "${searchQuery}"`}
                {selectedType !== "All" && ` in ${selectedType} category`}
              </span>
            ) : (
              <span>No medicines found</span>
            )}
          </div>
        </div>

        {/* Medicine Cards Grid */}
        {filteredMedicines.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedicines.map((medicine) => (
              <MedicineCard
                key={medicine.id}
                medicine={medicine}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          /* No Results Message */
          <div className="bg-gray-50 rounded-xl p-12 text-center">
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No information available
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery
                ? `We couldn't find any medicines matching "${searchQuery}". Please try another medicine name.`
                : "No medicines found for the selected filter. Please try a different category."}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedType("All");
              }}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Important Notice */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                Important Medical Disclaimer
              </h3>
              <p className="text-yellow-800 leading-relaxed">
                The information provided here is for educational purposes only
                and should not be used as a substitute for professional medical
                advice, diagnosis, or treatment. Always consult with a qualified
                healthcare provider before starting, stopping, or changing any
                medication. If you experience any adverse reactions or have
                concerns about a medication, seek immediate medical attention.
              </p>
            </div>
          </div>
        </div>

      {/* Medicine Details Modal */}
      <MedicineDetailsModal
        medicine={selectedMedicine}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default MedicineInfo;