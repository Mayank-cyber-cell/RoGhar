import { useState, useMemo } from "react";
import { Search, Filter, Pill, AlertCircle, Loader2, Sparkles } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import {
  medicineDatabase,
  medicineTypes,
  searchMedicines,
  filterMedicinesByType,
  searchMedicinesWithAPI,
} from "../data/medicineData";
import MedicineCard from "./MedicineCard";
import MedicineDetailsModal from "./MedicineDetailsModal";

const MedicineInfo = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [medicines, setMedicines] = useState(medicineDatabase);

  // Enhanced search with API integration
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setMedicines(medicineDatabase);
      return;
    }
    
    setIsSearching(true);
    try {
      const results = await searchMedicinesWithAPI(query);
      setMedicines(results);
    } catch (error) {
      console.error('Search failed:', error);
      setMedicines(searchMedicines(query, medicineDatabase));
    } finally {
      setIsSearching(false);
    }
  };

  // Filter medicines by type
  const filteredMedicines = useMemo(() => {
    return filterMedicinesByType(selectedType, medicines);
  }, [medicines, selectedType]);

  const handleViewDetails = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMedicine(null);
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
      {/* Enhanced Header with gradient background */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="relative">
              <Pill className="w-10 h-10 text-white" />
              <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1" />
            </div>
            <h2 className="text-4xl font-bold text-white">
              Medicine Information
            </h2>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Discover comprehensive information about medications with our enhanced search powered by medical databases
          </p>
        </div>
      </div>

      <div className="p-8">
        {/* Enhanced Search and Filter Controls */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Search Medicines
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  {isSearching ? (
                    <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                  ) : (
                    <Search className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Search by medicine name, condition, or symptoms..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                  disabled={isSearching}
                />
                {searchQuery && (
                  <button
                    onClick={() => handleSearch("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Type Filter */}
            <div className="lg:w-72">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Filter by Type
              </label>
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-lg"
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
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm font-medium text-gray-600">
            {filteredMedicines.length > 0 ? (
              <span>
                📊 Showing <span className="font-bold text-blue-600">{filteredMedicines.length}</span> medicine
                {filteredMedicines.length !== 1 ? "s" : ""}
                {searchQuery && ` for "${searchQuery}"`}
                {selectedType !== "All" && ` in ${selectedType} category`}
              </span>
            ) : (
              <span className="text-orange-600">🔍 No medicines found</span>
            )}
            </div>
            {searchQuery && (
              <div className="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                🔬 Enhanced search active
              </div>
            )}
          </div>
        </div>

        {/* Medicine Cards Grid */}
        {filteredMedicines.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-16 text-center border-2 border-dashed border-gray-200">
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
                handleSearch("");
                setSelectedType("All");
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Important Notice */}
        <div className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-8 shadow-sm">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-7 h-7 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xl font-bold text-amber-900 mb-3">
                Important Medical Disclaimer
              </h3>
              <p className="text-amber-800 leading-relaxed text-lg">
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