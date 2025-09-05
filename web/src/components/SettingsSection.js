import React, { useState, useEffect } from 'react';
import { getUserTimezone, setUserTimezone, getAvailableTimezones } from '../shared/utils/dateUtils';
import hybridNotificationService from '../utils/hybridNotificationService';

const SettingsSection = ({ buildVersion, onShowInstallModal }) => {
  const [selectedTimezone, setSelectedTimezone] = useState(getUserTimezone());
  const [availableTimezones] = useState(getAvailableTimezones());
  const [notificationPermission, setNotificationPermission] = useState(hybridNotificationService.permission);
  const [notifications, setNotifications] = useState(hybridNotificationService.getNotifications());
  const [notificationPreferences, setNotificationPreferences] = useState(hybridNotificationService.getPreferences());
  const [newNotificationTime, setNewNotificationTime] = useState('09:00');
  const [newNotificationMessage, setNewNotificationMessage] = useState('');

  const handleTimezoneChange = (timezone) => {
    setSelectedTimezone(timezone);
    setUserTimezone(timezone);
    // Refresh the page to apply timezone changes
    window.location.reload();
  };

  const requestNotificationPermission = async () => {
    try {
      const permission = await hybridNotificationService.initialize();
      setNotificationPermission(permission ? 'granted' : 'denied');
      if (permission) {
        hybridNotificationService.scheduleAllNotifications();
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const addNotification = () => {
    if (newNotificationTime) {
      const message = newNotificationMessage.trim() || 'Time to check in on your spiritual growth!';
      hybridNotificationService.addNotification(newNotificationTime, message);
      setNotifications(hybridNotificationService.getNotifications());
      setNewNotificationTime('09:00');
      setNewNotificationMessage('');
    }
  };

  const removeNotification = (id) => {
    hybridNotificationService.removeNotification(id);
    setNotifications(hybridNotificationService.getNotifications());
  };

  const toggleNotification = (id, enabled) => {
    hybridNotificationService.toggleNotification(id, enabled);
    setNotifications(hybridNotificationService.getNotifications());
  };

  const updateNotificationPreferences = (newPreferences) => {
    hybridNotificationService.updatePreferences(newPreferences);
    setNotificationPreferences(hybridNotificationService.getPreferences());
  };

  // Initialize notifications on component mount
  useEffect(() => {
    if (notificationPermission === 'granted') {
      hybridNotificationService.scheduleAllNotifications();
    }
  }, [notificationPermission]);
  const exportData = () => {
    const allData = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('spiritual_tracker_')) {
        allData[key] = localStorage.getItem(key);
      }
    }
    
    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `spiritual-tracker-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          Object.keys(data).forEach(key => {
            if (key.startsWith('spiritual_tracker_')) {
              localStorage.setItem(key, data[key]);
            }
          });
          alert('Data imported successfully! Please refresh the page.');
        } catch (error) {
          alert('Error importing data. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('spiritual_tracker_')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
      alert('All data cleared successfully! Please refresh the page.');
    }
  };

  return (
    <div className="fade-in">
      <div className="row justify-content-center">
        <div className="col-12" style={{ maxWidth: '520px' }}>
          <h3 className="text-center">Settings</h3>
          <p className="text-muted text-center mb-4">Manage your data and preferences</p>
          
          <div className="d-flex flex-column gap-4">
            <div className="card">
              <div className="card-body">
                <h5>Data Management</h5>
                
                <div className="d-grid gap-2">
                  <button 
                    className="btn btn-outline-primary"
                    onClick={exportData}
                  >
                    <i className="bi bi-download me-2"></i>
                    Export All Data
                  </button>
                  
                  <div className="mb-3">
                    <label className="form-label">Import Data</label>
                    <input
                      type="file"
                      className="form-control"
                      accept=".json"
                      onChange={importData}
                    />
                  </div>
                  
                  <button 
                    className="btn btn-outline-danger"
                    onClick={clearAllData}
                  >
                    <i className="bi bi-trash me-2"></i>
                    Clear All Data
                  </button>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="card-body">
                <h5>Timezone Settings</h5>
                <p className="text-muted mb-3">
                  Set your timezone to ensure dates are displayed correctly. 
                  This affects how "today" and "yesterday" are calculated.
                </p>
                
                <div className="mb-3">
                  <label className="form-label">Select Timezone</label>
                  <select
                    className="form-select"
                    value={selectedTimezone}
                    onChange={(e) => handleTimezoneChange(e.target.value)}
                  >
                    {availableTimezones.map((timezone) => (
                      <option key={timezone} value={timezone}>
                        {timezone.replace(/_/g, ' ')}
                      </option>
                    ))}
                  </select>
                  <small className="text-muted">
                    Current timezone: {selectedTimezone}
                  </small>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h5><i className="bi bi-bell me-2"></i>Notification Settings</h5>
                
                {!hybridNotificationService.isSupported ? (
                  <div className="alert alert-warning">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    Notifications are not supported in your browser.
                  </div>
                ) : (
                  <>
                    {notificationPermission === 'default' && (
                      <div className="alert alert-info">
                        <h6 className="alert-heading">Enable Notifications</h6>
                        <p className="mb-2">Get daily reminders to check in on your spiritual growth.</p>
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={requestNotificationPermission}
                        >
                          <i className="bi bi-bell me-2"></i>
                          Enable Notifications
                        </button>
                      </div>
                    )}

                    {notificationPermission === 'denied' && (
                      <div className="alert alert-warning">
                        <h6 className="alert-heading">Notifications Disabled</h6>
                        <p className="mb-0">Please enable notifications in your browser settings to receive reminders.</p>
                      </div>
                    )}

                    {notificationPermission === 'granted' && (
                      <>
                        <div className="alert alert-success">
                          <i className="bi bi-check-circle me-2"></i>
                          Notifications are enabled! You can set up daily reminders below.
                          <div className="mt-2">
                            <div className="d-flex gap-2 flex-wrap">
                              <button 
                                className="btn btn-outline-primary btn-sm"
                                onClick={async () => {
                                  const result = await hybridNotificationService.testHybridNotification();
                                  if (result) {
                                    alert('Hybrid notifications sent! Check both browser and system notifications.');
                                  } else {
                                    alert('Failed to send test notification. Check console for details.');
                                  }
                                }}
                              >
                                <i className="bi bi-bell me-2"></i>
                                Test Both
                              </button>
                              <button 
                                className="btn btn-outline-success btn-sm"
                                onClick={async () => {
                                  const result = await hybridNotificationService.testToastNotification();
                                  if (result) {
                                    alert('Toast notifications sent! Check the top-right corner of your browser window.');
                                  } else {
                                    alert('Failed to send test notification. Check console for details.');
                                  }
                                }}
                              >
                                <i className="bi bi-chat-dots me-2"></i>
                                Test Toast Only
                              </button>
                              <button 
                                className="btn btn-outline-info btn-sm"
                                onClick={async () => {
                                  const result = await hybridNotificationService.testOSNotification();
                                  if (result) {
                                    alert('OS notification sent! Check your system notification area.');
                                  } else {
                                    alert('Failed to send OS notification. Check console for details.');
                                  }
                                }}
                              >
                                <i className="bi bi-phone me-2"></i>
                                Test OS Only
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h6>Notification Preferences</h6>
                          <div className="row g-3">
                            <div className="col-md-6">
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="useToast"
                                  checked={notificationPreferences.useToast}
                                  onChange={(e) => updateNotificationPreferences({ useToast: e.target.checked })}
                                />
                                <label className="form-check-label" htmlFor="useToast">
                                  <i className="bi bi-chat-dots me-2"></i>
                                  In-Browser Toast Notifications
                                </label>
                                <small className="form-text text-muted d-block">
                                  Show notifications within the browser window
                                </small>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="useOS"
                                  checked={notificationPreferences.useOS}
                                  onChange={(e) => updateNotificationPreferences({ useOS: e.target.checked })}
                                />
                                <label className="form-check-label" htmlFor="useOS">
                                  <i className="bi bi-phone me-2"></i>
                                  System OS Notifications
                                </label>
                                <small className="form-text text-muted d-block">
                                  Show notifications in system notification center
                                </small>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Toast Duration (seconds)</label>
                              <select
                                className="form-select"
                                value={notificationPreferences.toastDuration / 1000}
                                onChange={(e) => updateNotificationPreferences({ toastDuration: parseInt(e.target.value) * 1000 })}
                              >
                                <option value={3}>3 seconds</option>
                                <option value={5}>5 seconds</option>
                                <option value={8}>8 seconds</option>
                                <option value={10}>10 seconds</option>
                              </select>
                            </div>
                            <div className="col-md-6">
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="osRequireInteraction"
                                  checked={notificationPreferences.osRequireInteraction}
                                  onChange={(e) => updateNotificationPreferences({ osRequireInteraction: e.target.checked })}
                                />
                                <label className="form-check-label" htmlFor="osRequireInteraction">
                                  Require OS Notification Interaction
                                </label>
                                <small className="form-text text-muted d-block">
                                  OS notifications stay until clicked
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h6>Add New Reminder</h6>
                          <div className="d-flex flex-column gap-3">
                            <div>
                              <label className="form-label">Time</label>
                              <input
                                type="time"
                                className="form-control"
                                value={newNotificationTime}
                                onChange={(e) => setNewNotificationTime(e.target.value)}
                                step="900"
                              />
                            </div>
                            <div>
                              <label className="form-label">Message (reminder message to display)</label>
                              <input
                                type="text"
                                className="form-control"
                                value={newNotificationMessage}
                                onChange={(e) => setNewNotificationMessage(e.target.value)}
                                placeholder="e.g., Time to check in on your spiritual growth!"
                              />
                            </div>
                            <div>
                              <button 
                                className="btn btn-primary w-100"
                                onClick={addNotification}
                              >
                                <i className="bi bi-plus me-2"></i>
                                Add Reminder
                              </button>
                            </div>
                          </div>
                        </div>

                        {notifications.length > 0 && (
                          <div>
                            <h6>Your Reminders</h6>
                            <div className="list-group">
                              {notifications
                                .sort((a, b) => a.time.localeCompare(b.time))
                                .map((notification) => {
                                const [hours, minutes] = notification.time.split(':').map(Number);
                                const hour12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
                                const ampm = hours < 12 ? 'AM' : 'PM';
                                const time12 = `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
                                
                                return (
                                  <div key={notification.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                      <div className="fw-bold">{time12}</div>
                                      <small className="text-muted">{notification.message}</small>
                                    </div>
                                  <div className="d-flex gap-2">
                                    <div className="form-check form-switch">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={notification.enabled}
                                        onChange={(e) => toggleNotification(notification.id, e.target.checked)}
                                      />
                                    </div>
                                    <button
                                      className="btn btn-outline-danger btn-sm"
                                      onClick={() => removeNotification(notification.id)}
                                      title="Remove reminder"
                                    >
                                      <i className="bi bi-trash"></i>
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            
            <div className="card">
              <div className="card-body">
                <h5><i className="bi bi-shield-check me-2"></i>Privacy & Data Security</h5>
                <div className="alert alert-info">
                  <h6 className="alert-heading">Your Privacy Matters</h6>
                  <p className="mb-2">
                    <strong>Complete Privacy:</strong> All your spiritual growth data is stored locally on your device. 
                    No information is ever transmitted to external servers or shared with third parties.
                  </p>
                  <p className="mb-2">
                    <strong>Local Storage:</strong> Your data remains under your complete control and is accessible 
                    only on the device you're currently using.
                  </p>
                  <p className="mb-0">
                    <strong>Full Control:</strong> You can export, import, or completely clear your data at any time 
                    using the options above. Your spiritual journey stays private and secure.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="card-body">
                <h5>App Information</h5>
                <p><strong>Version:</strong> 1.0.0{buildVersion && ` (${buildVersion})`}</p>
                <p><strong>Description:</strong> Comprehensive spiritual growth tracking application</p>
                <p><strong>Data Storage:</strong> Local browser storage</p>
                <p><strong>Privacy:</strong> All data stays on your device</p>
                
                <div className="mt-3 text-center">
                  <button 
                    className="btn btn-outline-primary"
                    onClick={onShowInstallModal}
                  >
                    <i className="bi bi-phone me-2"></i>
                    Install App
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;
