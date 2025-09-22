import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import Header from "../components/Header";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Download,
  Share2,
  Eye,
  Star,
  Users,
  Clock,
  Award,
  Smartphone,
  Monitor,
  Tablet
} from "lucide-react";

const PrototypeShowcase = () => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedView, setSelectedView] = useState("mobile");

  const features = [
    {
      title: "ABHA/Aadhaar Integration",
      description: "Seamless login with government-verified digital identity",
      demo: "Login flow demonstration with biometric verification"
    },
    {
      title: "Health Records Management",
      description: "Secure storage and easy access to all health documents",
      demo: "Upload, view, and share health records with QR codes"
    },
    {
      title: "Hospital Finder",
      description: "Interactive map showing nearby healthcare facilities",
      demo: "Real-time hospital search with ratings and availability"
    },
    {
      title: "Appointment Booking",
      description: "Easy scheduling with doctors and healthcare providers",
      demo: "Complete booking flow from search to confirmation"
    },
    {
      title: "Multilingual Support",
      description: "Available in English, Hindi, and Malayalam",
      demo: "Language switching and localized content display"
    },
    {
      title: "Offline Access",
      description: "Critical health information available without internet",
      demo: "Emergency access to health records and contact information"
    }
  ];

  const screenshots = [
    {
      title: "Dashboard Overview",
      description: "Clean, intuitive dashboard showing health summary",
      image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "Health Records",
      description: "Organized view of all medical documents and reports",
      image: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "Hospital Map",
      description: "Interactive map with hospital locations and details",
      image: "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "QR Code Generator",
      description: "Generate secure QR codes for health record sharing",
      image: "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "Appointment Booking",
      description: "Simple and efficient appointment scheduling interface",
      image: "https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "Security Features",
      description: "Comprehensive security and privacy controls",
      image: "https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  const stats = [
    { label: "Active Users", value: "10,000+", icon: Users },
    { label: "Health Records", value: "50,000+", icon: FileText },
    { label: "Partner Hospitals", value: "200+", icon: Building },
    { label: "User Rating", value: "4.8/5", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12 mt-[10vh]">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ROGHAR Prototype Showcase
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience our complete digital health platform designed specifically for migrant workers. 
            See how we're revolutionizing healthcare access with technology.
          </p>
        </div>

        {/* Video Demo Section */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Platform Demo Video
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                    🔴 LIVE DEMO
                  </span>
                  <span className="text-sm text-gray-500">Duration: 3:45</span>
                </div>
              </div>
            </div>
            
            {/* Video Player */}
            <div className="relative bg-black aspect-video">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-12 h-12 text-white ml-1" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    ROGHAR Platform Walkthrough
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Complete demonstration of all features and user flows
                  </p>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-2 mx-auto"
                  >
                    <Play className="w-5 h-5" />
                    <span>Play Demo Video</span>
                  </button>
                </div>
              </div>
              
              {/* Video Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="text-white hover:text-gray-300">
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  <button className="text-white hover:text-gray-300">
                    {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                  </button>
                  <div className="text-white text-sm">0:00 / 3:45</div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-white hover:text-gray-300">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="text-white hover:text-gray-300">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="text-white hover:text-gray-300">
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Screenshots */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Interactive Screenshots
            </h2>
            <p className="text-gray-600">
              Explore our platform across different devices and screen sizes
            </p>
          </div>

          {/* Device Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-xl shadow-sm p-2">
              <button
                onClick={() => setSelectedView("mobile")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedView === "mobile"
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Mobile</span>
              </button>
              <button
                onClick={() => setSelectedView("tablet")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedView === "tablet"
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Tablet className="w-4 h-4" />
                <span>Tablet</span>
              </button>
              <button
                onClick={() => setSelectedView("desktop")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedView === "desktop"
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span>Desktop</span>
              </button>
            </div>
          </div>

          {/* Screenshots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {screenshots.map((screenshot, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 relative">
                  <img
                    src={screenshot.image}
                    alt={screenshot.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center space-x-2">
                      <Eye className="w-4 h-4" />
                      <span>View Full Size</span>
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {screenshot.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {screenshot.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Key Features Demonstrated
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-lg">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-3">
                  {feature.description}
                </p>
                <p className="text-sm text-primary font-medium">
                  Demo: {feature.demo}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Stats */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              Platform Impact
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 opacity-80" />
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Architecture */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Technical Architecture
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Frontend</h3>
                <p className="text-sm text-gray-600">
                  React.js with responsive design, PWA capabilities, and offline support
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Server className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Backend</h3>
                <p className="text-sm text-gray-600">
                  Node.js API with AES-256 encryption, ABHA integration, and secure data handling
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Security</h3>
                <p className="text-sm text-gray-600">
                  End-to-end encryption, biometric authentication, and compliance with healthcare standards
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Experience ROGHAR?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of migrant workers who are already using ROGHAR to manage 
              their health records securely and access healthcare services easily.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary-dark transition-colors font-semibold">
                Try Live Demo
              </button>
              <button className="border border-primary text-primary px-8 py-4 rounded-lg hover:bg-primary hover:text-white transition-colors font-semibold">
                Download Presentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrototypeShowcase;