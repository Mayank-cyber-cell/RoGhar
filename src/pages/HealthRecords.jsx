import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useUser } from "../contexts/UserContext";
import Header from "../components/Header";
import { FileText, Plus, Calendar, User, ArrowLeft } from "lucide-react";

const HealthRecords = () => {
  const { t } = useLanguage();
  const { currentUser, getWorkerHealthRecords, addHealthRecord } = useUser();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRecord, setNewRecord] = useState({
    type: "",
    doctor: "",
    notes: "",
    prescription: "",
    date: new Date().toISOString().split("T")[0],
  });

  const healthRecords = getWorkerHealthRecords(currentUser?.id || 1);

  const handleAddRecord = (e) => {
    e.preventDefault();
    addHealthRecord(newRecord);
    setNewRecord({
      type: "",
      doctor: "",
      notes: "",
      prescription: "",
      date: new Date().toISOString().split("T")[0],
    });
    setShowAddForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecord((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl  mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex mt-[10vh] items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/worker/dashboard"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t("healthRecords")}
              </h1>
              <p className="text-gray-600">
                View and manage your medical history
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Record</span>
          </button>
        </div>

        {/* Records List */}
        <div className="space-y-6">
          {healthRecords.length > 0 ? (
            healthRecords.map((record) => (
              <div
                key={record.id}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <FileText className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {record.type}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{record.doctor}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{record.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Notes</h4>
                    <p className="text-gray-700">{record.notes}</p>
                  </div>

                  {record.prescription && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        Prescription
                      </h4>
                      <p className="text-gray-700">{record.prescription}</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Health Records
              </h3>
              <p className="text-gray-600 mb-6">
                You don't have any health records yet. Add your first record to
                get started.
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Add First Record
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Record Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Add Health Record
            </h3>

            <form onSubmit={handleAddRecord} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Record Type
                </label>
                <input
                  type="text"
                  name="type"
                  value={newRecord.type}
                  onChange={handleChange}
                  placeholder="e.g., General Checkup, Blood Test"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor Name
                </label>
                <input
                  type="text"
                  name="doctor"
                  value={newRecord.doctor}
                  onChange={handleChange}
                  placeholder="e.g., Dr. Smith"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={newRecord.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={newRecord.notes}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Medical notes and observations..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prescription (Optional)
                </label>
                <textarea
                  name="prescription"
                  value={newRecord.prescription}
                  onChange={handleChange}
                  rows="2"
                  placeholder="Prescribed medications..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {t("cancel")}
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  {t("save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthRecords;
