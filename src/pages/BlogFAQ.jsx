import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import Header from "../components/Header";
import {
  BookOpen,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Calendar,
  User,
  Tag,
  Search,
  Heart,
  Shield,
  Smartphone,
  Users,
  FileText,
  AlertCircle
} from "lucide-react";

const BlogFAQ = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("blog");
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const blogPosts = [
    {
      id: 1,
      title: "Understanding Your ABHA Health ID: A Complete Guide",
      excerpt: "Learn everything about India's digital health ID system and how it benefits migrant workers.",
      content: "The Ayushman Bharat Health Account (ABHA) is a revolutionary digital health ID that's transforming healthcare access in India...",
      author: "Dr. Priya Nair",
      date: "2025-01-20",
      category: "Digital Health",
      readTime: "5 min read",
      image: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400",
      tags: ["ABHA", "Digital Health", "Healthcare Access"]
    },
    {
      id: 2,
      title: "5 Essential Health Checkups Every Migrant Worker Should Get",
      excerpt: "Preventive healthcare is crucial for maintaining good health while working away from home.",
      content: "Working in a new environment can expose you to different health risks. Here are the essential checkups you should prioritize...",
      author: "Dr. Rajesh Kumar",
      date: "2025-01-18",
      category: "Preventive Care",
      readTime: "7 min read",
      image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400",
      tags: ["Health Checkups", "Prevention", "Worker Health"]
    },
    {
      id: 3,
      title: "How to Keep Your Health Records Safe and Accessible",
      excerpt: "Best practices for managing your digital health records securely.",
      content: "Your health records are valuable assets. Learn how to keep them secure while ensuring they're accessible when needed...",
      author: "Tech Team ROGHAR",
      date: "2025-01-15",
      category: "Data Security",
      readTime: "4 min read",
      image: "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=400",
      tags: ["Security", "Health Records", "Privacy"]
    },
    {
      id: 4,
      title: "Mental Health Support for Migrant Workers",
      excerpt: "Addressing the unique mental health challenges faced by workers away from home.",
      content: "Mental health is just as important as physical health. Here's how to maintain good mental health while working away from home...",
      author: "Dr. Meera Sharma",
      date: "2025-01-12",
      category: "Mental Health",
      readTime: "6 min read",
      image: "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=400",
      tags: ["Mental Health", "Support", "Wellbeing"]
    },
    {
      id: 5,
      title: "Vaccination Schedule: Staying Protected While Traveling",
      excerpt: "Essential vaccinations for workers moving between different states and regions.",
      content: "Different regions may have different health risks. Stay protected with the right vaccination schedule...",
      author: "Dr. Suresh Menon",
      date: "2025-01-10",
      category: "Vaccination",
      readTime: "5 min read",
      image: "https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=400",
      tags: ["Vaccination", "Travel Health", "Prevention"]
    }
  ];

  const faqCategories = [
    {
      category: "Getting Started",
      icon: Smartphone,
      faqs: [
        {
          question: "How do I create my ROGHAR account?",
          answer: "You can create your ROGHAR account using your ABHA ID or Aadhaar number. Simply visit our signup page, enter your details, and verify your identity through OTP. The process takes less than 5 minutes."
        },
        {
          question: "What is ABHA ID and why do I need it?",
          answer: "ABHA (Ayushman Bharat Health Account) is India's digital health ID that creates a unified health record for every citizen. It helps you access healthcare services seamlessly across the country and keeps all your health records in one place."
        },
        {
          question: "Is ROGHAR free to use?",
          answer: "Yes, ROGHAR is completely free for all migrant workers. Our mission is to make healthcare accessible to everyone, regardless of their economic status."
        }
      ]
    },
    {
      category: "Health Records",
      icon: FileText,
      faqs: [
        {
          question: "How do I upload my health records?",
          answer: "You can upload health records by going to the 'Health Records' section in your dashboard. Click 'Add Record', fill in the details, and upload any supporting documents like prescriptions or test reports."
        },
        {
          question: "Can I share my records with doctors?",
          answer: "Yes, you can easily share your health records with healthcare providers using our secure QR code system or by granting temporary access through the app."
        },
        {
          question: "How long are my records stored?",
          answer: "Your health records are stored securely for as long as you maintain your account. You have full control over your data and can delete records anytime."
        }
      ]
    },
    {
      category: "Security & Privacy",
      icon: Shield,
      faqs: [
        {
          question: "How secure is my health data?",
          answer: "We use military-grade AES-256 encryption to protect your data. All information is encrypted both in transit and at rest. We follow international security standards and undergo regular security audits."
        },
        {
          question: "Who can access my health records?",
          answer: "Only you have access to your complete health records. You can choose to share specific information with healthcare providers, but you maintain full control over what is shared and with whom."
        },
        {
          question: "Do you sell my health data?",
          answer: "Absolutely not. We never sell, rent, or share your personal health data with third parties for commercial purposes. Your privacy is our top priority."
        }
      ]
    },
    {
      category: "Appointments & Services",
      icon: Calendar,
      faqs: [
        {
          question: "How do I book an appointment?",
          answer: "Go to the 'Book Appointment' section, select your preferred hospital and doctor, choose an available time slot, and confirm your booking. You'll receive a confirmation message with all details."
        },
        {
          question: "Can I cancel or reschedule appointments?",
          answer: "Yes, you can cancel or reschedule appointments up to 2 hours before the scheduled time through your dashboard or by calling the hospital directly."
        },
        {
          question: "What if I need emergency care?",
          answer: "For emergencies, call 108 (National Ambulance Service) immediately. Your ROGHAR profile includes emergency contact information and critical health details that can be accessed by emergency responders."
        }
      ]
    },
    {
      category: "Technical Support",
      icon: HelpCircle,
      faqs: [
        {
          question: "The app is not working properly. What should I do?",
          answer: "First, try refreshing the page or restarting the app. If the problem persists, check your internet connection. You can also contact our support team at support@roghar.in or call our helpline."
        },
        {
          question: "I forgot my password. How can I reset it?",
          answer: "Click on 'Forgot Password' on the login page and enter your ABHA ID or Aadhaar number. You'll receive an OTP to reset your password."
        },
        {
          question: "Can I use ROGHAR offline?",
          answer: "Some features like viewing downloaded health records and emergency information are available offline. However, most features require an internet connection for security and real-time updates."
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  const toggleFAQ = (categoryIndex, faqIndex) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setExpandedFAQ(expandedFAQ === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12 mt-[10vh]">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Health Awareness & Support
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed about health topics and get answers to your questions about using ROGHAR.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-sm p-2">
            <button
              onClick={() => setActiveTab("blog")}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === "blog"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span>Health Blog</span>
            </button>
            <button
              onClick={() => setActiveTab("faq")}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === "faq"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <HelpCircle className="w-5 h-5" />
              <span>FAQ</span>
            </button>
          </div>
        </div>

        {/* Blog Section */}
        {activeTab === "blog" && (
          <div>
            {/* Featured Post */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                      Featured
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                      {blogPosts[0].category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{blogPosts[0].author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{blogPosts[0].date}</span>
                      </div>
                    </div>
                    <button className="text-primary hover:text-primary-dark font-medium">
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500">{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        By {post.author} • {post.date}
                      </div>
                      <button className="text-primary hover:text-primary-dark text-sm font-medium">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {activeTab === "faq" && (
          <div>
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search frequently asked questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                />
              </div>
            </div>

            {/* FAQ Categories */}
            <div className="space-y-8">
              {filteredFAQs.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <category.icon className="w-6 h-6 text-primary" />
                      <h2 className="text-xl font-semibold text-gray-900">
                        {category.category}
                      </h2>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                        {category.faqs.length}
                      </span>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {category.faqs.map((faq, faqIndex) => (
                      <div key={faqIndex} className="p-6">
                        <button
                          onClick={() => toggleFAQ(categoryIndex, faqIndex)}
                          className="w-full flex items-center justify-between text-left"
                        >
                          <h3 className="text-lg font-medium text-gray-900 pr-4">
                            {faq.question}
                          </h3>
                          {expandedFAQ === `${categoryIndex}-${faqIndex}` ? (
                            <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          )}
                        </button>
                        {expandedFAQ === `${categoryIndex}-${faqIndex}` && (
                          <div className="mt-4 text-gray-600 leading-relaxed">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Support */}
            <div className="mt-12 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Still have questions?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Our support team is here to help you 24/7
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  📧 Email Support
                </button>
                <button className="bg-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors">
                  📞 Call Helpline
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogFAQ;