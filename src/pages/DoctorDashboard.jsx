import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useUser } from "../contexts/UserContext";
import Header from "../components/Header";
import {
  Calendar,
  Users,
  Clock,
  CheckCircle,
  User,
  Phone,
  MapPin,
} from "lucide-react";

const DoctorDashboard = () => {
  const { t } = useLanguage();
  const {
    currentUser,
    getDoctorAppointments,
    updateAppointmentStatus,
    workers,
  } = useUser();
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const appointments = getDoctorAppointments(currentUser?.id || 1);
  const todayAppointments = appointments.filter(
    (apt) => apt.date === new Date().toISOString().split("T")[0]
  );
  const pendingAppointments = appointments.filter(
    (apt) => apt.status === "pending"
  );

  const handleStatusUpdate = (appointmentId, newStatus) => {
    updateAppointmentStatus(appointmentId, newStatus);
    setSelectedAppointment(null);
  };

  const getPatientDetails = (workerId) => {
    return workers.find((worker) => worker.id === workerId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white mt-[10vh] rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-secondary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome, {currentUser?.name}
              </h1>
              <p className="text-gray-600">
                {currentUser?.specialization} - {currentUser?.hospital}
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
                  Today's Appointments
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {todayAppointments.length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Approvals
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {pendingAppointments.length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Patients
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {appointments.length}
                </p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    appointments.filter((apt) => apt.status === "completed")
                      .length
                  }
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Patient {t("appointments")}
          </h2>

          {appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appointment) => {
                const patient = getPatientDetails(appointment.workerId);
                return (
                  <div
                    key={appointment.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {patient?.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {appointment.date} at {appointment.time}
                          </p>
                          <p className="text-sm text-gray-500">
                            {appointment.reason}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {t(appointment.status)}
                        </span>
                        <button
                          onClick={() => setSelectedAppointment(appointment)}
                          className="text-primary hover:text-primary-dark text-sm font-medium"
                        >
                          {t("view")}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No appointments scheduled
            </p>
          )}
        </div>
      </div>

      {/* Patient Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Patient Details
            </h3>

            {(() => {
              const patient = getPatientDetails(selectedAppointment.workerId);
              return (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{patient?.name}</p>
                      <p className="text-sm text-gray-600">
                        Patient ID: {patient?.id}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <p className="text-sm">{patient?.phone}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <p className="text-sm">{patient?.address}</p>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm font-medium text-gray-900">
                      Appointment Details
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedAppointment.date} at {selectedAppointment.time}
                    </p>
                    <p className="text-sm text-gray-600">
                      Reason: {selectedAppointment.reason}
                    </p>
                  </div>

                  {selectedAppointment.status === "pending" && (
                    <div className="flex space-x-3 pt-4">
                      <button
                        onClick={() =>
                          handleStatusUpdate(
                            selectedAppointment.id,
                            "confirmed"
                          )
                        }
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() =>
                          handleStatusUpdate(
                            selectedAppointment.id,
                            "completed"
                          )
                        }
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Mark Complete
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedAppointment(null)}
                    className="w-full mt-4 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
