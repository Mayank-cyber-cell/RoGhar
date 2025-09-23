import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useUser } from "../contexts/UserContext";
import Header from "../components/Header";
import MedicineInfo from "../components/MedicineInfo";
import {
  Calendar,
  FileText,
  TestTube,
  User,
  Clock,
  CheckCircle,
  Pill,
  Video,
  MapPin,
} from "lucide-react";

const WorkerDashboard = () => {
  const { t } = useLanguage();
  const {
    currentUser,
    getWorkerAppointments,
    getWorkerHealthRecords,
    getWorkerTestReports,
  } = useUser();

  const appointments = getWorkerAppointments(currentUser?.id || 1);
  const healthRecords = getWorkerHealthRecords(currentUser?.id || 1);
  const testReports = getWorkerTestReports(currentUser?.id || 1);

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === "confirmed" || apt.status === "pending"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl mt-[10vh] shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome, {currentUser?.name}
              </h1>
              <p className="text-gray-600">
                Manage your health records and appointments
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Upcoming Appointments
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {upcomingAppointments.length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Health Records
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {healthRecords.length}
                </p>
              </div>
              <FileText className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Test Reports
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {testReports.length}
                </p>
              </div>
              <TestTube className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Visits
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {appointments.length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link
            to="/health-dashboard"
            className="bg-blue-600 text-white p-6 rounded-xl hover:bg-blue-700 transition-colors group"
          >
            <FileText className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold mb-2">
              Health Dashboard
            </h3>
            <p className="text-blue-200">
              Complete health profile with QR codes and voice support
            </p>
          </Link>

          <Link
            to="/doctor-consultation"
            className="bg-purple-600 text-white p-6 rounded-xl hover:bg-purple-700 transition-colors group"
          >
            <Video className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold mb-2">
              {t("startConsultation")}
            </h3>
            <p className="text-purple-200">
              Video consultation with qualified doctors
            </p>
          </Link>

          <Link
            to="/nearby-services"
            className="bg-red-600 text-white p-6 rounded-xl hover:bg-red-700 transition-colors group"
          >
            <MapPin className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold mb-2">
              {t("nearbyServices")}
            </h3>
            <p className="text-red-200">
              Find nearby hospitals and emergency services
            </p>
          </Link>

          <Link
            to="/worker/book-appointment"
            className="bg-primary text-white p-6 rounded-xl hover:bg-primary-dark transition-colors group"
          >
            <Calendar className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold mb-2">
              {t("bookAppointment")}
            </h3>
            <p className="text-primary-light">
              Schedule a new appointment with a doctor
            </p>
          </Link>

          <Link
            to="/worker/health-records"
            className="bg-secondary text-white p-6 rounded-xl hover:bg-secondary-dark transition-colors group"
          >
            <FileText className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold mb-2">{t("healthRecords")}</h3>
            <p className="text-secondary-light">
              View your medical history and records
            </p>
          </Link>

          <Link
            to="/worker/test-reports"
            className="bg-green-600 text-white p-6 rounded-xl hover:bg-green-700 transition-colors group"
          >
            <TestTube className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold mb-2">{t("testReports")}</h3>
            <p className="text-green-200">
              Access your test results and reports
            </p>
          </Link>
        </div>

        {/* Medicine Information Section */}
        <div className="mb-8">
          <MedicineInfo />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Upcoming {t("appointments")}
            </h2>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.slice(0, 3).map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {appointment.hospital}
                      </p>
                      <p className="text-sm text-gray-600">
                        {appointment.date} at {appointment.time}
                      </p>
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          appointment.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {t(appointment.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No upcoming appointments
              </p>
            )}
          </div>

          {/* Recent Health Records */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recent {t("healthRecords")}
            </h2>
            {healthRecords.length > 0 ? (
              <div className="space-y-4">
                {healthRecords.slice(0, 3).map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <FileText className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{record.type}</p>
                      <p className="text-sm text-gray-600">
                        {record.doctor} - {record.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No health records available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
