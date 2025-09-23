import { useState, useEffect } from 'react';
import { Bell, Plus, Trash2, Clock, Pill, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ReminderManager = () => {
  const { t } = useLanguage();
  const [reminders, setReminders] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    type: 'medicine',
    title: '',
    description: '',
    time: '',
    frequency: 'daily',
    enabled: true
  });

  useEffect(() => {
    // Load reminders from localStorage
    const savedReminders = localStorage.getItem('roghar_reminders');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }
  }, []);

  useEffect(() => {
    // Save reminders to localStorage
    localStorage.setItem('roghar_reminders', JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = (e) => {
    e.preventDefault();
    const reminder = {
      id: Date.now(),
      ...newReminder,
      createdAt: new Date().toISOString()
    };
    
    setReminders([...reminders, reminder]);
    setNewReminder({
      type: 'medicine',
      title: '',
      description: '',
      time: '',
      frequency: 'daily',
      enabled: true
    });
    setShowAddForm(false);

    // Schedule notification (if supported)
    if ('Notification' in window && Notification.permission === 'granted') {
      scheduleNotification(reminder);
    }
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const toggleReminder = (id) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, enabled: !r.enabled } : r
    ));
  };

  const scheduleNotification = (reminder) => {
    // Simple notification scheduling (in a real app, you'd use a more sophisticated system)
    const now = new Date();
    const reminderTime = new Date();
    const [hours, minutes] = reminder.time.split(':');
    reminderTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    if (reminderTime > now) {
      const timeout = reminderTime.getTime() - now.getTime();
      setTimeout(() => {
        new Notification(`ROGHAR Reminder: ${reminder.title}`, {
          body: reminder.description,
          icon: '/favicon.ico',
          tag: `reminder-${reminder.id}`
        });
      }, timeout);
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        alert('Notifications enabled! You will receive reminders.');
      }
    }
  };

  const getReminderIcon = (type) => {
    switch (type) {
      case 'medicine': return <Pill className="w-5 h-5 text-blue-600" />;
      case 'vaccine': return <Shield className="w-5 h-5 text-green-600" />;
      case 'appointment': return <Clock className="w-5 h-5 text-purple-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Bell className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold text-gray-900">{t('reminders')}</h2>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={requestNotificationPermission}
            className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full hover:bg-yellow-200 transition-colors"
          >
            Enable Notifications
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>{t('addReminder')}</span>
          </button>
        </div>
      </div>

      {/* Reminders List */}
      <div className="space-y-3">
        {reminders.length > 0 ? (
          reminders.map((reminder) => (
            <div
              key={reminder.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                reminder.enabled 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getReminderIcon(reminder.type)}
                  <div>
                    <h3 className="font-medium text-gray-900">{reminder.title}</h3>
                    <p className="text-sm text-gray-600">{reminder.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span>⏰ {reminder.time}</span>
                      <span>🔄 {reminder.frequency}</span>
                      <span className={reminder.enabled ? 'text-green-600' : 'text-red-600'}>
                        {reminder.enabled ? '✅ Active' : '❌ Disabled'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleReminder(reminder.id)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      reminder.enabled
                        ? 'bg-red-100 text-red-800 hover:bg-red-200'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    {reminder.enabled ? 'Disable' : 'Enable'}
                  </button>
                  <button
                    onClick={() => deleteReminder(reminder.id)}
                    className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p>No reminders set. Add your first reminder!</p>
          </div>
        )}
      </div>

      {/* Add Reminder Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('addReminder')}
            </h3>

            <form onSubmit={addReminder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={newReminder.type}
                  onChange={(e) => setNewReminder({...newReminder, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="medicine">Medicine</option>
                  <option value="vaccine">Vaccine</option>
                  <option value="appointment">Appointment</option>
                  <option value="checkup">Health Checkup</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newReminder.title}
                  onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                  placeholder="e.g., Take Blood Pressure Medicine"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newReminder.description}
                  onChange={(e) => setNewReminder({...newReminder, description: e.target.value})}
                  placeholder="Additional details..."
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={newReminder.time}
                    onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Frequency
                  </label>
                  <select
                    value={newReminder.frequency}
                    onChange={(e) => setNewReminder({...newReminder, frequency: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="once">One Time</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Add Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReminderManager;