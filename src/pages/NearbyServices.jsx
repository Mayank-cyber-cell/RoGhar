import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import MapView from '../components/MapView';
import {
  MapPin,
  Phone,
  AlertTriangle,
  Navigation,
  Filter,
  Search,
  Star,
  Clock,
  Zap
} from 'lucide-react';

const NearbyServices = () => {
  const { t } = useLanguage();
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);

  // Mock hospital data with coordinates
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
    }
  ];

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesType = filterType === 'all' || hospital.type === filterType;
    const matchesSearch = hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hospital.specialties.some(specialty => 
                           specialty.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    return matchesType && matchesSearch;
  });

  const handleEmergencySOS = () => {
    setShowEmergencyAlert(true);
    
    // In a real app, this would:
    // 1. Get user's location
    // 2. Call emergency services
    // 3. Send location to emergency contacts
    // 4. Show nearest emergency hospitals
    
    setTimeout(() => {
      setShowEmergencyAlert(false);
    }, 5000);
  };

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
            {t('nearbyServices')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find nearby hospitals, clinics, and emergency services with real-time information
          </p>
        </div>

        {/* Emergency SOS Button */}
        <div className="text-center mb-8">
          <button
            onClick={handleEmergencySOS}
            className="bg-red-600 text-white px-8 py-4 rounded-full hover:bg-red-700 transition-colors flex items-center space-x-3 mx-auto text-lg font-semibold shadow-lg animate-pulse"
          >
            <AlertTriangle className="w-6 h-6" />
            <span>{t('emergencySOS')}</span>
            <Zap className="w-6 h-6" />
          </button>
          <p className="text-sm text-gray-600 mt-2">
            Emergency services: 108 (Ambulance) | 102 (Medical Emergency)
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
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Interactive Map
                </h2>
                <p className="text-sm text-gray-600">
                  📍 Your Location: Kochi, Kerala • {filteredHospitals.length} hospitals found
                </p>
              </div>
              
              <MapView 
                hospitals={filteredHospitals}
                onHospitalSelect={setSelectedHospital}
                userLocation={[10.0889, 76.3378]}
              />
              
              {/* Map Legend */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-gray-600">Emergency 24/7</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600">Private</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">Government</span>
                    </div>
                  </div>
                  <button className="flex items-center space-x-2 text-primary hover:text-primary-dark">
                    <Navigation className="w-4 h-4" />
                    <span>Get Directions</span>
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
            
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredHospitals.map((hospital) => (
                <div
                  key={hospital.id}
                  className={`bg-white rounded-xl shadow-sm p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedHospital?.id === hospital.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedHospital(hospital)}
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={hospital.image}
                      alt={hospital.name}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">
                          {hospital.name}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ml-2 ${getTypeColor(hospital.type)}`}>
                          {hospital.type}
                        </span>
                      </div>
                      
                      <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{hospital.distance}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                          <span>{hospital.rating}/5</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{hospital.timings}</span>
                        </div>
                      </div>

                      {hospital.emergency && (
                        <div className="mt-2">
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                            🚨 24/7 Emergency
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Hospital Details */}
        {selectedHospital && (
          <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start space-x-4">
                <img
                  src={selectedHospital.image}
                  alt={selectedHospital.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedHospital.name}
                  </h2>
                  <p className="text-gray-600 mb-2">{selectedHospital.address}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{selectedHospital.rating}/5 rating</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedHospital.distance} away</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedHospital(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
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
                    <span className="text-gray-400">🏥</span>
                    <span>{selectedHospital.beds} beds</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">👨‍⚕️</span>
                    <span>{selectedHospital.doctors} doctors</span>
                  </div>
                  {selectedHospital.emergency && (
                    <div className="flex items-center space-x-2">
                      <span className="text-red-500">🚨</span>
                      <span className="text-red-600 font-medium">24/7 Emergency Services</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Call Hospital</span>
              </button>
              <button className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary-dark flex items-center space-x-2">
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                <span>📅</span>
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Emergency Alert Modal */}
      {showEmergencyAlert && (
        <div className="fixed inset-0 bg-red-600 bg-opacity-95 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Emergency SOS Activated
            </h2>
            
            <div className="space-y-3 text-left mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">📍 Location shared with emergency services</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">📞 Calling 108 (Ambulance Service)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">👥 Emergency contacts notified</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">🏥 Nearest emergency hospital: GMC Hospital (2.3 km)</span>
              </div>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-800">
                <strong>Demo Mode:</strong> This is a prototype. In production, this would actually contact emergency services and share your location.
              </p>
            </div>
            
            <button
              onClick={() => setShowEmergencyAlert(false)}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Close Alert
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NearbyServices;