import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import QRCodeGenerator from '../components/QRCodeGenerator';
import VoiceInput from '../components/VoiceInput';
import ReminderManager from '../components/ReminderManager';
import {
  User,
  Download,
  Upload,
  FileText,
  Shield,
  Heart,
  Pill,
  Calendar,
  Activity,
  Mic,
  Volume2
} from 'lucide-react';

const HealthDashboard = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [voiceQuery, setVoiceQuery] = useState('');

  // Enhanced mock patient data
  const mockPatient = {
    name: 'राज कुमार (Raj Kumar)',
    abhaId: '12-3456-7890-1234',
    aadhaar: '1234-5678-9012',
    age: 32,
    gender: 'Male',
    bloodGroup: 'B+',
    phone: '+91 9876543210',
    emergencyContact: '+91 9876543211',
    address: 'Kochi, Kerala',
    occupation: 'Construction Worker',
    photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    registrationDate: '2024-01-15',
    lastUpdated: '2025-01-20'
  };

  const mockVaccinations = [
    {
      id: 1,
      vaccine: 'COVID-19 Booster',
      date: '2024-12-20',
      nextDue: '2025-12-20',
      batch: 'COV001234',
      center: 'PHC Kochi',
      status: 'completed',
      certificate: 'COV-CERT-2024-001234'
    },
    {
      id: 2,
      vaccine: 'Hepatitis B',
      date: '2024-11-15',
      nextDue: '2025-11-15',
      batch: 'HEP567890',
      center: 'District Hospital',
      status: 'completed',
      certificate: 'HEP-CERT-2024-567890'
    },
    {
      id: 3,
      vaccine: 'Tetanus',
      date: '2024-10-05',
      nextDue: '2034-10-05',
      batch: 'TET123456',
      center: 'Community Health Center',
      status: 'completed',
      certificate: 'TET-CERT-2024-123456'
    }
  ];

  const mockPrescriptions = [
    {
      id: 1,
      medicine: 'Paracetamol 500mg',
      dosage: '1 tablet twice daily after meals',
      duration: '5 days',
      prescribedBy: 'Dr. Priya Nair',
      date: '2025-01-15',
      status: 'active',
      instructions: 'Take with food to avoid stomach upset'
    },
    {
      id: 2,
      medicine: 'Iron Tablets (Ferrous Sulfate)',
      dosage: '1 tablet daily after meals',
      duration: '30 days',
      prescribedBy: 'Dr. Suresh Kumar',
      date: '2025-01-10',
      status: 'active',
      instructions: 'Take with vitamin C for better absorption'
    },
    {
      id: 3,
      medicine: 'Vitamin D3 60000 IU',
      dosage: '1 capsule weekly',
      duration: '12 weeks',
      prescribedBy: 'Dr. Priya Nair',
      date: '2025-01-15',
      status: 'active',
      instructions: 'Take with milk or after a meal'
    }
  ];

  const mockHealthRecords = [
    {
      id: 1,
      date: '2025-01-15',
      type: 'General Health Checkup',
      doctor: 'Dr. Priya Nair',
      hospital: 'Government Medical College, Kochi',
      diagnosis: 'Overall health good. Mild iron deficiency detected.',
      vitals: {
        bloodPressure: '120/80 mmHg',
        heartRate: '72 bpm',
        temperature: '98.6°F',
        weight: '68 kg',
        height: '170 cm',
        bmi: '23.5'
      },
      labResults: {
        hemoglobin: '11.2 g/dL (Low)',
        bloodSugar: '95 mg/dL (Normal)',
        cholesterol: '180 mg/dL (Normal)'
      },
      prescription: 'Iron supplements, Multivitamins',
      nextVisit: '2025-02-15',
      status: 'completed'
    },
    {
      id: 2,
      date: '2025-01-10',
      type: 'Blood Test - Complete Blood Count',
      doctor: 'Dr. Suresh Kumar',
      hospital: 'Aster Medcity, Kochi',
      diagnosis: 'Mild anemia, otherwise normal parameters',
      labResults: {
        hemoglobin: '11.2 g/dL',
        wbc: '7500/μL',
        platelets: '250000/μL',
        hematocrit: '34%'
      },
      prescription: 'Iron tablets for 30 days',
      status: 'completed'
    }
  ];

  const mockReports = [
    {
      id: 1,
      name: 'Complete Blood Count Report',
      date: '2025-01-10',
      type: 'Blood Test',
      size: '245 KB',
      downloadUrl: '#cbc-report-2025-01-10'
    },
    {
      id: 2,
      name: 'Chest X-Ray Report',
      date: '2024-12-15',
      type: 'X-Ray',
      size: '1.2 MB',
      downloadUrl: '#xray-report-2024-12-15'
    },
    {
      id: 3,
      name: 'COVID-19 Vaccination Certificate',
      date: '2024-12-20',
      type: 'Certificate',
      size: '156 KB',
      downloadUrl: '#covid-cert-2024-12-20'
    }
  ];

  const handleVoiceResult = (transcript) => {
    setVoiceQuery(transcript);
    // In a real app, this would process the voice command
    // For demo, we'll just show what was heard
    alert(`Voice command received: "${transcript}"`);
  };

  const downloadReport = (report) => {
    // Mock download functionality
    alert(`Downloading: ${report.name}`);
  };

  const uploadReport = () => {
    // Mock upload functionality
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        alert(`Uploading: ${file.name}`);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Patient Profile Header */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 mb-8 mt-[10vh]">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={mockPatient.photo}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold mb-2">{mockPatient.name}</h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="opacity-80">ABHA ID</p>
                  <p className="font-semibold">{mockPatient.abhaId}</p>
                </div>
                <div>
                  <p className="opacity-80">Age / Gender</p>
                  <p className="font-semibold">{mockPatient.age} / {mockPatient.gender}</p>
                </div>
                <div>
                  <p className="opacity-80">Blood Group</p>
                  <p className="font-semibold">{mockPatient.bloodGroup}</p>
                </div>
                <div>
                  <p className="opacity-80">Occupation</p>
                  <p className="font-semibold">{mockPatient.occupation}</p>
                </div>
              </div>
            </div>
            
            {/* Voice Input */}
            <div className="bg-white/10 rounded-xl p-4">
              <h3 className="text-sm font-medium mb-2">Voice Assistant</h3>
              <VoiceInput 
                onResult={handleVoiceResult}
                placeholder="Ask about your health..."
              />
              {voiceQuery && (
                <p className="text-xs mt-2 opacity-80">Last query: "{voiceQuery}"</p>
              )}
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
                  {mockPrescriptions.filter(p => p.status === 'active').length}
                </p>
              </div>
              <Pill className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reports</p>
                <p className="text-2xl font-bold text-gray-900">{mockReports.length}</p>
              </div>
              <Activity className="w-8 h-8 text-orange-500" />
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
                { id: "reports", label: "Reports", icon: Download },
                { id: "qr-code", label: "QR Code", icon: User },
                { id: "reminders", label: "Reminders", icon: Calendar }
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
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <FileText className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Health checkup completed</p>
                          <p className="text-xs text-gray-600">Jan 15, 2025 - Dr. Priya Nair</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Activity className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Blood test results available</p>
                          <p className="text-xs text-gray-600">Jan 10, 2025 - CBC Report</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <Shield className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">COVID-19 booster received</p>
                          <p className="text-xs text-gray-600">Dec 20, 2024 - PHC Kochi</p>
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
                        <span className="text-sm text-gray-600">5 days ago</span>
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
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <span className="text-sm font-medium">Health Alert</span>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                          Mild Anemia
                        </span>
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
                  <button
                    onClick={uploadReport}
                    className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload Record</span>
                  </button>
                </div>
                {mockHealthRecords.map((record) => (
                  <div key={record.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">{record.type}</h4>
                        <p className="text-sm text-gray-600">{record.doctor} - {record.hospital}</p>
                        <p className="text-sm text-gray-500">{record.date}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                        {record.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Diagnosis</h5>
                          <p className="text-sm text-gray-700">{record.diagnosis}</p>
                        </div>
                        
                        {record.vitals && (
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">Vital Signs</h5>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>BP: {record.vitals.bloodPressure}</div>
                              <div>HR: {record.vitals.heartRate}</div>
                              <div>Weight: {record.vitals.weight}</div>
                              <div>BMI: {record.vitals.bmi}</div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        {record.labResults && (
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">Lab Results</h5>
                            <div className="space-y-1 text-sm">
                              {Object.entries(record.labResults).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                  <span className={value.includes('Low') ? 'text-red-600' : 'text-gray-700'}>
                                    {value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Prescription</h5>
                          <p className="text-sm text-gray-700">{record.prescription}</p>
                        </div>

                        {record.nextVisit && (
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">Next Visit</h5>
                            <p className="text-sm text-gray-700">{record.nextVisit}</p>
                          </div>
                        )}
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
                    <Download className="w-4 h-4" />
                    <span>Download Certificate</span>
                  </button>
                </div>
                {mockVaccinations.map((vaccination) => (
                  <div key={vaccination.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{vaccination.vaccine}</h4>
                        <p className="text-sm text-gray-600">Certificate: {vaccination.certificate}</p>
                        <p className="text-sm text-gray-500">{vaccination.center}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                        {vaccination.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">Date Given:</p>
                        <p className="text-gray-600">{vaccination.date}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Next Due:</p>
                        <p className="text-gray-600">{vaccination.nextDue}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Batch:</p>
                        <p className="text-gray-600">{vaccination.batch}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Prescriptions Tab */}
            {activeTab === "prescriptions" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Current Prescriptions</h3>
                {mockPrescriptions.map((prescription) => (
                  <div key={prescription.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{prescription.medicine}</h4>
                        <p className="text-sm text-gray-600">Prescribed by {prescription.prescribedBy}</p>
                        <p className="text-sm text-gray-500">{prescription.date}</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                        {prescription.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">Dosage:</p>
                        <p className="text-gray-600">{prescription.dosage}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Duration:</p>
                        <p className="text-gray-600">{prescription.duration}</p>
                      </div>
                    </div>
                    {prescription.instructions && (
                      <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          <strong>Instructions:</strong> {prescription.instructions}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === "reports" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Medical Reports</h3>
                  <button
                    onClick={uploadReport}
                    className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload Report</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockReports.map((report) => (
                    <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{report.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{report.type} • {report.date}</p>
                          <p className="text-xs text-gray-500 mb-3">{report.size}</p>
                          <button
                            onClick={() => downloadReport(report)}
                            className="flex items-center space-x-1 text-primary hover:text-primary-dark text-sm"
                          >
                            <Download className="w-3 h-3" />
                            <span>Download</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* QR Code Tab */}
            {activeTab === "qr-code" && (
              <div>
                <QRCodeGenerator 
                  data={{
                    patient: mockPatient,
                    lastCheckup: mockHealthRecords[0],
                    vaccinations: mockVaccinations,
                    emergencyInfo: {
                      bloodGroup: mockPatient.bloodGroup,
                      emergencyContact: mockPatient.emergencyContact,
                      allergies: 'None known',
                      chronicConditions: 'Mild anemia'
                    }
                  }}
                  title="Health Profile QR Code"
                />
              </div>
            )}

            {/* Reminders Tab */}
            {activeTab === "reminders" && (
              <div>
                <ReminderManager />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthDashboard;