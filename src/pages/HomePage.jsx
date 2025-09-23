import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import Header from "../components/Header";
import {
  Users,
  Stethoscope,
  Calendar,
  FileText,
  Heart,
  Shield,
  Pill, 
  MapPin,
  QrCode,
  BookOpen,
  Monitor,
  ArrowRight,
  CheckCircle,
  Star
} from "lucide-react";

const HomePage = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: FileText,
      title: "Health Dashboard (Demo)",
      description: "Complete patient profile with health records, vaccination status, and QR codes",
      link: "/health-dashboard",
      color: "bg-blue-500"
    },
    {
      icon: MapPin,
      title: "Nearby Medical Services",
      description: "Interactive map with emergency SOS and nearby hospitals",
      link: "/nearby-services",
      color: "bg-green-500"
    },
    {
      icon: QrCode,
      title: "Doctor Consultation",
      description: "Video consultation with qualified doctors (Agora SDK demo)",
      link: "/doctor-consultation",
      color: "bg-purple-500"
    },
    {
      icon: Shield,
      title: "Advanced Security",
      description: "AES-256 encryption with ABHA/Aadhaar authentication",
      link: "/security",
      color: "bg-red-500"
    },
    {
      icon: BookOpen,
      title: "Health Awareness",
      description: "Educational content and FAQ for better health management",
      link: "/blog-faq",
      color: "bg-orange-500"
    },
    {
      icon: Monitor,
      title: "Live Prototype",
      description: "Interactive demo showcasing all platform capabilities",
      link: "/prototype-showcase",
      color: "bg-indigo-500"
    }
    {
      icon: QrCode,
      title: "QR Code Generator",
      description: "Generate secure QR codes for instant health record sharing",
      link: "/qr-generator",
      color: "bg-orange-500"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Users" },
    { number: "50,000+", label: "Health Records" },
    { number: "200+", label: "Partner Hospitals" },
    { number: "4.8/5", label: "User Rating" }
  ];

  return (
    <div
      style={{ fontFamily: "'Roboto', sans-serif" }}
      className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50"
    >
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 mt-[10vh]">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {t("welcomeRoghar")}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Ek Kadam Swasth Jeevan Ki Ore - Your Complete Digital Health Companion for Migrant Workers
          </p>
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Star className="w-5 h-5 text-yellow-500" />
            <Star className="w-5 h-5 text-yellow-500" />
            <Star className="w-5 h-5 text-yellow-500" />
            <Star className="w-5 h-5 text-yellow-500" />
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-600 ml-2">Trusted by 10,000+ workers</span>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Digital Health Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience all features of ROGHAR through our interactive demos and live prototypes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center text-primary font-medium group-hover:text-primary-dark">
                  <span>Explore Feature</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Security Highlight */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-8 mb-16">
          <div className="text-center">
            <Shield className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">
              Bank-Level Security for Your Health Data
            </h2>
            <p className="text-xl opacity-90 mb-6 max-w-3xl mx-auto">
              AES-256 encryption, ABHA/Aadhaar authentication, and compliance with international healthcare standards
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-300" />
                <span>End-to-end encryption</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-300" />
                <span>Government-verified login</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-300" />
                <span>HIPAA compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of migrant workers who trust ROGHAR for secure, accessible healthcare management. 
            Create your account in less than 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              to="/worker/signup"
              className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center space-x-2"
            >
              <Users className="w-5 h-5" />
              <span>{t("workerSignup")}</span>
            </Link>
            <Link
              to="/doctor/signup"
              className="bg-secondary text-white px-8 py-4 rounded-lg font-semibold hover:bg-secondary-dark transition-colors flex items-center justify-center space-x-2"
            >
              <Stethoscope className="w-5 h-5" />
              <span>{t("doctorSignup")}</span>
            </Link>
          </div>
          <div className="text-center">
            <Link
              to="/mockup-dashboard"
              className="text-primary hover:text-primary-dark font-medium inline-flex items-center space-x-2"
            >
              <span>Try Live Demo First</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
