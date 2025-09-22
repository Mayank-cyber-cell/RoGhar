import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import Header from "../components/Header";
import {
  Calendar,
  FileText,
  TestTube,
  User,
  Shield,
  Heart,
  Pill,
  Download,
  QrCode,
  MapPin,
  Phone,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity
} from "lucide-react";

const MockupDashboard = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for demonstration
  const mockUser = {
    name: "राज कुमार (Raj Kumar)",
    id: "ABHA-12345678901234",
    age: 32,
    bloodGroup: "B+",
    phone: "+91 9876543210",
    address: "Kochi, Kerala",
    photo: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  };

  const mockHealthRecords = [
    {
      id: 1,
      date: "2025-01-15",
      type: "General Checkup",
      doctor: "Dr. Priya Nair",
      hospital: "Government Medical College, Kochi",
      diagnosis: "Healthy - Regular checkup completed",
      prescription: "Multivitamin tablets, Continue regular exercise",
      status: "completed"
    },
    {
      id: 2,
      date: "2025-01-10",
      type: "Blood Test",
      doctor: "Dr. Suresh Kumar",
      hospital: "Aster Medcity, Kochi",
      diagnosis: "All parameters normal",
      prescription: "Iron supplements for 30 days",
      status: "completed"
    }
  ];

  const mockVaccinations = [
    {
      id: 1,
      vaccine: "COVID-19 Booster",
      date: "2024-12-20",
      nextDue: "2025-12-20",
      batch: "COV001234",
      center: "PHC Kochi",
      status: "completed"
    },
    {
      id: 2,
      vaccine: "Hepatitis B",
      date: "2024-11-15",
      nextDue: "2025-11-15",
      batch: "HEP567890",
      center: "District Hospital",
      status: "completed"
    },
    {
      id: 3,
      vaccine: "Tetanus",
      date: "2024-10-05",
      nextDue: "2034-10-05",
      batch: "TET123456",
      center: "Community Health Center",
      status: "completed"
    }
  ];

  const mockPrescriptions = [
    {
      id: 1,
      medicine: "Paracetamol 500mg",
      dosage: "1 tablet twice daily",
      duration: "5 days",
      prescribedBy: "Dr. Priya Nair",
      date: "2025-01-15",
      status: "active"
    },
    {
      id: 2,
      medicine: "Iron Tablets",
      dosage: "1 tablet daily after meals",
      duration: "30 days",
      prescribedBy: "Dr. Suresh Kumar",
      date: "2025-01-10",
      status: "active"
    },
    {
      id: 3,
      medicine: "Vitamin D3",
      dosage: "1 capsule weekly",
      duration: "12 weeks",
      prescribedBy: "Dr. Priya Nair",
      date: "2025-01-15",
      status: "active"
    }
  ];

  const mockAppointments = [
    {
      id: 1,
      date: "2025-01-25",
      time: "10:00 AM",
      doctor: "Dr. Priya Nair",
      hospital: "Government Medical College, Kochi",
      type: "Follow-up",
      status: "confirmed"
    },
    {
      id: 2,
      date: "2025-02-01",
      time: "2:30 PM",
      doctor: "Dr. Rajesh Menon",
      hospital: "Aster Medcity, Kochi",
      type: "Specialist Consultation",
      status: "pending"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "active":
        return "bg-blue-100 text-blue-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 mb-8 mt-[10vh]">
          <div className="flex items-center space-x-6">
            <img
              src={mockUser.photo}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2">{mockUser.name}</h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="opacity-80">ABHA ID</p>
                  <p className="font-semibold">{mockUser.id}</p>
                </div>
                <div>
                  <p className="opacity-80">Age</p>
                  <p className="font-semibold">{mockUser.age} years</p>
                </div>
                <div>
                  <p className="opacity-80">Blood Group</p>
                  <p className="font-semibold">{mockUser.bloodGroup}</p>
                </div>
                <div>
                  <p className="opacity-80">Location</p>
                  <p className="font-semibold">{mockUser.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Health Records</p>
                <p className="text-2xl font-bold text-gray-900">{mockHealthRecords.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vaccinations</p>
                <p className="text-2xl font-bold text-gray-900">{mockVaccinations.length}</p>
              </div>
              <Shield className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Prescriptions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockPrescriptions.filter(p => p.status === "active").length}
                </p>
              </div>
              <Pill className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Appointments</p>
                <p className="text-2xl font-bold text-gray-900">{mockAppointments.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "overview", label: "Overview", icon: Activity },
                { id: "records", label: "Health Records", icon: FileText },
                { id: "vaccinations", label: "Vaccinations", icon: Shield },
                { id: "prescriptions", label: "Prescriptions", icon: Pill },
                { id: "appointments", label: "Appointments", icon: Calendar }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Activity */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium">Health checkup completed</p>
                          <p className="text-xs text-gray-600">Jan 15, 2025 - Dr. Priya Nair</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <TestTube className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium">Blood test results available</p>
                          <p className="text-xs text-gray-600">Jan 10, 2025 - All normal</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-yellow-600" />
                        <div>
                          <p className="text-sm font-medium">Upcoming appointment</p>
                          <p className="text-xs text-gray-600">Jan 25, 2025 - Follow-up</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Health Summary */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Summary</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">Overall Health Status</span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                          Good
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">Last Checkup</span>
                        <span className="text-sm text-gray-600">15 days ago</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">Vaccination Status</span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                          Up to date
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">Active Medications</span>
                        <span className="text-sm text-gray-600">3 prescriptions</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Health Records Tab */}
            {activeTab === "records" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Health Records</h3>
                  <button className="flex items-center space-x-2 text-primary hover:text-primary-dark">
                    <Download className="w-4 h-4" />
                    <span>Export All</span>
                  </button>
                </div>
                {mockHealthRecords.map((record) => (
                  <div key={record.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{record.type}</h4>
                        <p className="text-sm text-gray-600">{record.doctor} - {record.hospital}</p>
                        <p className="text-sm text-gray-500">{record.date}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Diagnosis:</p>
                        <p className="text-sm text-gray-600">{record.diagnosis}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Prescription:</p>
                        <p className="text-sm text-gray-600">{record.prescription}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Vaccinations Tab */}
            {activeTab === "vaccinations" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Vaccination Records</h3>
                  <button className="flex items-center space-x-2 text-primary hover:text-primary-dark">
                    <QrCode className="w-4 h-4" />
                    <span>Generate Certificate</span>
                  </button>
                </div>
                {mockVaccinations.map((vaccination) => (
                  <div key={vaccination.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{vaccination.vaccine}</h4>
                        <p className="text-sm text-gray-600">Batch: {vaccination.batch}</p>
                        <p className="text-sm text-gray-500">{vaccination.center}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(vaccination.status)}`}>
                        {vaccination.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">Date Given:</p>
                        <p className="text-gray-600">{vaccination.date}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Next Due:</p>
                        <p className="text-gray-600">{vaccination.nextDue}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Prescriptions Tab */}
            {activeTab === "prescriptions" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Current Prescriptions</h3>
                  <button className="flex items-center space-x-2 text-primary hover:text-primary-dark">
                    <Download className="w-4 h-4" />
                    <span>Download All</span>
                  </button>
                </div>
                {mockPrescriptions.map((prescription) => (
                  <div key={prescription.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{prescription.medicine}</h4>
                        <p className="text-sm text-gray-600">Prescribed by {prescription.prescribedBy}</p>
                        <p className="text-sm text-gray-500">{prescription.date}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(prescription.status)}`}>
                        {prescription.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">Dosage:</p>
                        <p className="text-gray-600">{prescription.dosage}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Duration:</p>
                        <p className="text-gray-600">{prescription.duration}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Appointments Tab */}
            {activeTab === "appointments" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
                    Book New Appointment
                  </button>
                </div>
                {mockAppointments.map((appointment) => (
                  <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{appointment.type}</h4>
                        <p className="text-sm text-gray-600">{appointment.doctor}</p>
                        <p className="text-sm text-gray-500">{appointment.hospital}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockupDashboard;