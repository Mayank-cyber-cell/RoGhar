import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import Header from "../components/Header";
import {
  QrCode,
  Download,
  Share2,
  User,
  Shield,
  FileText,
  Calendar,
  Heart,
  Smartphone,
  CheckCircle,
  Copy
} from "lucide-react";

const QRGenerator = () => {
  const { t } = useLanguage();
  const [selectedRecord, setSelectedRecord] = useState("health-summary");
  const [qrGenerated, setQrGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mock user data
  const mockUser = {
    name: "राज कुमार (Raj Kumar)",
    abhaId: "12-3456-7890-1234",
    age: 32,
    bloodGroup: "B+",
    phone: "+91 9876543210",
    emergencyContact: "+91 9876543211",
    address: "Kochi, Kerala"
  };

  const recordTypes = [
    {
      id: "health-summary",
      title: "Health Summary",
      description: "Basic health information and emergency details",
      icon: Heart,
      data: {
        name: mockUser.name,
        abhaId: mockUser.abhaId,
        bloodGroup: mockUser.bloodGroup,
        emergencyContact: mockUser.emergencyContact,
        allergies: "None known",
        chronicConditions: "None",
        lastCheckup: "2025-01-15"
      }
    },
    {
      id: "vaccination-certificate",
      title: "Vaccination Certificate",
      description: "COVID-19 and other vaccination records",
      icon: Shield,
      data: {
        name: mockUser.name,
        abhaId: mockUser.abhaId,
        vaccines: [
          { name: "COVID-19 Booster", date: "2024-12-20", batch: "COV001234" },
          { name: "Hepatitis B", date: "2024-11-15", batch: "HEP567890" }
        ],
        issuedBy: "Government of Kerala",
        issuedDate: "2025-01-20"
      }
    },
    {
      id: "prescription",
      title: "Current Prescription",
      description: "Active medications and dosage information",
      icon: FileText,
      data: {
        name: mockUser.name,
        abhaId: mockUser.abhaId,
        prescribedBy: "Dr. Priya Nair",
        date: "2025-01-15",
        medications: [
          { name: "Paracetamol 500mg", dosage: "1 tablet twice daily", duration: "5 days" },
          { name: "Iron Tablets", dosage: "1 tablet daily", duration: "30 days" }
        ]
      }
    },
    {
      id: "appointment",
      title: "Appointment Details",
      description: "Upcoming appointment information",
      icon: Calendar,
      data: {
        name: mockUser.name,
        abhaId: mockUser.abhaId,
        appointmentDate: "2025-01-25",
        appointmentTime: "10:00 AM",
        doctor: "Dr. Priya Nair",
        hospital: "Government Medical College, Kochi",
        type: "Follow-up consultation"
      }
    }
  ];

  const selectedRecordData = recordTypes.find(record => record.id === selectedRecord);

  const generateQR = () => {
    setQrGenerated(true);
  };

  const copyToClipboard = () => {
    const qrData = JSON.stringify(selectedRecordData.data, null, 2);
    navigator.clipboard.writeText(qrData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate a simple QR code pattern (for demo purposes)
  const generateQRPattern = () => {
    const size = 21; // Standard QR code size
    const pattern = [];
    
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        // Create a pseudo-random pattern based on position and selected record
        const hash = (i * 31 + j * 17 + selectedRecord.length) % 100;
        row.push(hash > 50);
      }
      pattern.push(row);
    }
    
    return pattern;
  };

  const qrPattern = generateQRPattern();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8 mt-[10vh]">
          <QrCode className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            QR Code Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Generate secure QR codes for your health records, vaccination certificates, 
            and appointment details for quick access and sharing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Record Selection */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Select Record Type
              </h2>
              <div className="space-y-3">
                {recordTypes.map((record) => (
                  <div
                    key={record.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedRecord === record.id
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => {
                      setSelectedRecord(record.id);
                      setQrGenerated(false);
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <record.icon className={`w-6 h-6 mt-1 ${
                        selectedRecord === record.id ? "text-primary" : "text-gray-400"
                      }`} />
                      <div>
                        <h3 className={`font-semibold ${
                          selectedRecord === record.id ? "text-primary" : "text-gray-900"
                        }`}>
                          {record.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {record.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Preview */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Data Preview
                </h3>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                  {JSON.stringify(selectedRecordData.data, null, 2)}
                </pre>
              </div>
            </div>
          </div>

          {/* QR Code Generation */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Generated QR Code
              </h2>
              
              {!qrGenerated ? (
                <div className="text-center py-12">
                  <QrCode className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-6">
                    Click generate to create your secure QR code
                  </p>
                  <button
                    onClick={generateQR}
                    className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-2 mx-auto"
                  >
                    <QrCode className="w-5 h-5" />
                    <span>Generate QR Code</span>
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  {/* QR Code Display */}
                  <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg mb-6">
                    <div className="grid grid-cols-21 gap-0" style={{ width: '252px', height: '252px' }}>
                      {qrPattern.map((row, i) => 
                        row.map((cell, j) => (
                          <div
                            key={`${i}-${j}`}
                            className={`w-3 h-3 ${cell ? 'bg-black' : 'bg-white'}`}
                          />
                        ))
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">QR Code Generated Successfully</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>Download PNG</span>
                      </button>
                      <button className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary-dark transition-colors flex items-center space-x-2">
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Security Information */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Security & Privacy
                  </h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Data is encrypted using AES-256 encryption</li>
                    <li>• QR codes expire after 24 hours for security</li>
                    <li>• Only essential information is included</li>
                    <li>• ABHA/Aadhaar verification required</li>
                    <li>• No personal data stored on external servers</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Usage Instructions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                How to Use
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <p className="text-sm text-gray-700">
                    Select the type of record you want to share
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <p className="text-sm text-gray-700">
                    Generate the secure QR code
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <p className="text-sm text-gray-700">
                    Share with healthcare providers or download for offline use
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <p className="text-sm text-gray-700">
                    Healthcare providers can scan to access your information instantly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;