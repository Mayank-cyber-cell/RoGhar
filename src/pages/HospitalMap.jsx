import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import Header from "../components/Header";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  Navigation,
  Filter,
  Search,
  Heart,
  Stethoscope,
  Building,
  Users
} from "lucide-react";

const HospitalMap = () => {
  const { t } = useLanguage();
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock hospital data
  const hospitals = [
    {
      id: 1,
      name: "Government Medical College Hospital",
      type: "government",
      address: "Kalamassery, Kochi, Kerala 683503",
      phone: "+91 484 285 2100",
      distance: "2.3 km",
      rating: 4.2,
      specialties: ["General Medicine", "Surgery", "Cardiology", "Neurology"],
      timings: "24/7 Emergency",
      coordinates: { lat: 10.0889, lng: 76.3378 },
      image: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400",
      emergency: true,
      beds: 850,
      doctors: 120
    },
    {
      id: 2,
      name: "Aster Medcity",
      type: "private",
      address: "Cheranalloor, Kochi, Kerala 682027",
      phone: "+91 484 669 9999",
      distance: "4.1 km",
      rating: 4.6,
      specialties: ["Cardiology", "Oncology", "Neurosurgery", "Transplant"],
      timings: "24/7",
      coordinates: { lat: 9.9312, lng: 76.2673 },
      image: "https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg?auto=compress&cs=tinysrgb&w=400",
      emergency: true,
      beds: 670,
      doctors: 200
    },
    {
      id: 3,
      name: "Rajagiri Hospital",
      type: "private",
      address: "Chunangamveli, Aluva, Kerala 683112",
      phone: "+91 484 291 2000",
      distance: "6.8 km",
      rating: 4.4,
      specialties: ["General Medicine", "Orthopedics", "Gynecology"],
      timings: "6:00 AM - 10:00 PM",
      coordinates: { lat: 10.1102, lng: 76.3534 },
      image: "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=400",
      emergency: false,
      beds: 400,
      doctors: 85
    },
    {
      id: 4,
      name: "Amrita Institute of Medical Sciences",
      type: "private",
      address: "AIMS Ponekkara, Kochi, Kerala 682041",
      phone: "+91 484 285 1234",
      distance: "8.2 km",
      rating: 4.7,
      specialties: ["Multi-specialty", "Research", "Advanced Surgery"],
      timings: "24/7",
      coordinates: { lat: 10.0458, lng: 76.3312 },
      image: "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=400",
      emergency: true,
      beds: 1350,
      doctors: 300
    },
    {
      id: 5,
      name: "Lakeshore Hospital",
      type: "private",
      address: "NH 47 Bypass, Maradu, Kochi, Kerala 682304",
      phone: "+91 484 270 1000",
      distance: "5.5 km",
      rating: 4.3,
      specialties: ["Cardiology", "Gastroenterology", "Urology"],
      timings: "24/7",
      coordinates: { lat: 9.9591, lng: 76.2897 },
      image: "https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg?auto=compress&cs=tinysrgb&w=400",
      emergency: true,
      beds: 220,
      doctors: 60
    },
    {
      id: 6,
      name: "Primary Health Centre - Kochi",
      type: "government",
      address: "Fort Kochi, Kerala 682001",
      phone: "+91 484 221 5678",
      distance: "3.7 km",
      rating: 3.8,
      specialties: ["General Medicine", "Pediatrics", "Vaccination"],
      timings: "8:00 AM - 6:00 PM",
      coordinates: { lat: 9.9658, lng: 76.2427 },
      image: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=400",
      emergency: false,
      beds: 30,
      doctors: 8
    }
  ];

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesType = filterType === "all" || hospital.type === filterType;
    const matchesSearch = hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hospital.specialties.some(specialty => 
                           specialty.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    return matchesType && matchesSearch;
  });

  const getTypeColor = (type) => {
    switch (type) {
      case "government":
        return "bg-green-100 text-green-800";
      case "private":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8 mt-[10vh]">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nearby Hospitals & Clinics
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find healthcare facilities near you with real-time information about services, 
            timings, and availability.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search hospitals, specialties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <div className="lg:w-48">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="government">Government</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="h-96 bg-gradient-to-br from-blue-100 to-green-100 relative">
                {/* Static Map Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Interactive Map
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Real-time hospital locations and navigation
                    </p>
                    <div className="bg-white rounded-lg p-4 shadow-lg max-w-sm mx-auto">
                      <p className="text-sm text-gray-700">
                        📍 Your Location: Kochi, Kerala<br/>
                        🏥 {filteredHospitals.length} hospitals found nearby
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map Markers Simulation */}
                <div className="absolute top-20 left-20 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                <div className="absolute top-32 right-24 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="absolute bottom-24 left-32 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
              </div>

              {/* Map Controls */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Emergency</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Private</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Government</span>
                    </div>
                  </div>
                  <button className="flex items-center space-x-2 text-primary hover:text-primary-dark">
                    <Navigation className="w-4 h-4" />
                    <span className="text-sm">Get Directions</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Hospital List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Found {filteredHospitals.length} hospitals
            </h2>
            
            {filteredHospitals.map((hospital) => (
              <div
                key={hospital.id}
                className={`bg-white rounded-xl shadow-sm p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedHospital?.id === hospital.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedHospital(hospital)}
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {hospital.name}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(hospital.type)}`}>
                        {hospital.type}
                      </span>
                    </div>
                    
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{hospital.distance}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span>{hospital.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{hospital.timings}</span>
                      </div>
                    </div>

                    {hospital.emergency && (
                      <div className="mt-2">
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                          24/7 Emergency
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Hospital Details */}
        {selectedHospital && (
          <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedHospital.name}
                </h2>
                <p className="text-gray-600">{selectedHospital.address}</p>
              </div>
              <button
                onClick={() => setSelectedHospital(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{selectedHospital.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{selectedHospital.timings}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{selectedHospital.distance} away</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedHospital.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Facilities</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4 text-gray-400" />
                    <span>{selectedHospital.beds} beds</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Stethoscope className="w-4 h-4 text-gray-400" />
                    <span>{selectedHospital.doctors} doctors</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{selectedHospital.rating}/5 rating</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex space-x-4">
              <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Call Hospital</span>
              </button>
              <button className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary-dark flex items-center space-x-2">
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalMap;