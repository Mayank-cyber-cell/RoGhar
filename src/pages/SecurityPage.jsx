import { useLanguage } from "../contexts/LanguageContext";
import Header from "../components/Header";
import {
  Shield,
  Lock,
  Key,
  Eye,
  Server,
  Smartphone,
  CheckCircle,
  AlertTriangle,
  FileText,
  Users,
  Globe,
  Zap
} from "lucide-react";

const SecurityPage = () => {
  const { t } = useLanguage();

  const securityFeatures = [
    {
      icon: Lock,
      title: "AES-256 Encryption",
      description: "Military-grade encryption protects all your health data both in transit and at rest.",
      details: [
        "End-to-end encryption for all data transmission",
        "Encrypted database storage with rotating keys",
        "Zero-knowledge architecture - we can't see your data",
        "Compliant with international security standards"
      ]
    },
    {
      icon: Key,
      title: "ABHA/Aadhaar Authentication",
      description: "Secure login using government-verified digital identity systems.",
      details: [
        "Integration with India's ABHA (Ayushman Bharat Health Account)",
        "Aadhaar-based biometric verification",
        "Multi-factor authentication support",
        "Government-backed identity verification"
      ]
    },
    {
      icon: Eye,
      title: "Privacy by Design",
      description: "Your privacy is built into every aspect of our platform.",
      details: [
        "Minimal data collection - only what's necessary",
        "Granular privacy controls for data sharing",
        "Automatic data anonymization for analytics",
        "GDPR and Indian data protection compliance"
      ]
    },
    {
      icon: Server,
      title: "Secure Infrastructure",
      description: "Enterprise-grade security infrastructure protects your information.",
      details: [
        "ISO 27001 certified data centers in India",
        "24/7 security monitoring and threat detection",
        "Regular security audits and penetration testing",
        "Disaster recovery and backup systems"
      ]
    }
  ];

  const complianceStandards = [
    {
      name: "HIPAA",
      description: "Health Insurance Portability and Accountability Act compliance",
      icon: FileText
    },
    {
      name: "ISO 27001",
      description: "International standard for information security management",
      icon: Shield
    },
    {
      name: "SOC 2",
      description: "Service Organization Control 2 Type II certification",
      icon: CheckCircle
    },
    {
      name: "GDPR",
      description: "General Data Protection Regulation compliance",
      icon: Globe
    }
  ];

  const securityPractices = [
    "Regular security training for all team members",
    "Automated vulnerability scanning and patching",
    "Incident response plan with 24/7 monitoring",
    "Data retention policies with automatic deletion",
    "Secure development lifecycle (SDLC) practices",
    "Third-party security assessments and audits"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16 mt-[10vh]">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Shield className="w-20 h-20 text-primary" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Why ROGHAR is Safe?
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Your health data is precious. We use military-grade security, government-verified 
            authentication, and privacy-first design to keep your information safe and secure.
          </p>
        </div>

        {/* Security Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Security Features
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start space-x-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Authentication Flow */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Secure Authentication Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">1. Enter ABHA/Aadhaar</h3>
                <p className="text-sm opacity-90">
                  Use your government-issued digital identity
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Key className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">2. Biometric Verification</h3>
                <p className="text-sm opacity-90">
                  Fingerprint or face recognition for added security
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">3. Encrypted Session</h3>
                <p className="text-sm opacity-90">
                  All data encrypted with AES-256 encryption
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">4. Secure Access</h3>
                <p className="text-sm opacity-90">
                  Access your health records safely
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Standards */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Compliance & Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceStandards.map((standard, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow">
                <standard.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{standard.name}</h3>
                <p className="text-sm text-gray-600">{standard.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Practices */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Our Security Practices
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {securityPractices.map((practice, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">{practice}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Protection Promise */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Promise to You
              </h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg text-gray-700 mb-6">
                  We understand that your health information is deeply personal. That's why we've built 
                  ROGHAR with security and privacy as our top priorities, not afterthoughts.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div className="bg-white rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">🔒 Your Data, Your Control</h3>
                    <p className="text-sm text-gray-600">
                      You decide what to share, when to share it, and with whom.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">🛡️ Zero Data Breaches</h3>
                    <p className="text-sm text-gray-600">
                      Our security-first approach has maintained a perfect security record.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">🌟 Transparent Practices</h3>
                    <p className="text-sm text-gray-600">
                      Regular security reports and open communication about our practices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Access */}
        <div className="bg-red-50 rounded-2xl p-8 border border-red-200">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-red-900 mb-3">
                Emergency Access Protocol
              </h3>
              <p className="text-red-800 mb-4">
                In medical emergencies, authorized healthcare providers can access critical 
                information to save lives, while maintaining security protocols.
              </p>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Emergency access requires multiple healthcare provider verification</li>
                <li>• All emergency access is logged and audited</li>
                <li>• Only critical medical information is accessible</li>
                <li>• You're notified of any emergency access to your records</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;