import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

class HybridNotificationService {
  constructor() {
    this.isSupported = 'Notification' in window;
    this.permission = this.isSupported ? Notification.permission : 'denied';
    this.notifications = this.loadNotifications();
    this.intervals = new Map();
    this.preferences = this.loadPreferences();
  }

  loadNotifications() {
    const saved = localStorage.getItem('spiritual_tracker_notifications');
    return saved ? JSON.parse(saved) : [];
  }

  saveNotifications() {
    localStorage.setItem('spiritual_tracker_notifications', JSON.stringify(this.notifications));
  }

  loadPreferences() {
    const saved = localStorage.getItem('spiritual_tracker_notification_preferences');
    return saved ? JSON.parse(saved) : {
      useToast: true,
      useOS: true,
      toastDuration: 5000,
      osRequireInteraction: false
    };
  }

  savePreferences() {
    localStorage.setItem('spiritual_tracker_notification_preferences', JSON.stringify(this.preferences));
  }

  updatePreferences(newPreferences) {
    this.preferences = { ...this.preferences, ...newPreferences };
    this.savePreferences();
  }

  // Toast Notification Methods
  showToastNotification(title, message, options = {}) {
    const defaultOptions = {
      text: `${title}\n${message}`,
      duration: this.preferences.toastDuration,
      gravity: 'top',
      position: 'right',
      backgroundColor: '#0d6efd',
      color: '#ffffff',
      stopOnFocus: true,
      close: true,
      style: {
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        padding: '12px 16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      }
    };

    const toastOptions = { ...defaultOptions, ...options };
    
    console.log('Showing toast notification:', { title, message, options: toastOptions });
    
    return Toastify(toastOptions).showToast();
  }

  showToastSuccess(title, message) {
    return this.showToastNotification(title, message, {
      backgroundColor: '#28a744',
      icon: '✅'
    });
  }

  showToastWarning(title, message) {
    return this.showToastNotification(title, message, {
      backgroundColor: '#ffc107',
      color: '#212529',
      icon: '⚠️'
    });
  }

  showToastError(title, message) {
    return this.showToastNotification(title, message, {
      backgroundColor: '#dc3545',
      icon: '❌'
    });
  }

  showToastInfo(title, message) {
    return this.showToastNotification(title, message, {
      backgroundColor: '#17a2b8',
      icon: 'ℹ️'
    });
  }

  // OS Notification Methods
  async showOSNotification(title, options = {}) {
    if (!this.isSupported || this.permission !== 'granted') {
      console.log('OS notifications not available or permission denied');
      return false;
    }

    try {
      console.log('Creating OS notification with options:', { title, ...options });
      
      const notification = new Notification(title, {
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-192x192.png',
        requireInteraction: this.preferences.osRequireInteraction,
        silent: false,
        vibrate: [200, 100, 200],
        actions: [
          {
            action: 'open',
            title: 'Open App'
          }
        ],
        ...options
      });

      // Add event listeners for debugging
      notification.onclick = () => {
        console.log('OS notification clicked');
        window.focus();
        notification.close();
      };

      notification.onshow = () => {
        console.log('OS notification shown successfully');
      };

      notification.onerror = (error) => {
        console.error('OS notification error:', error);
      };

      notification.onclose = () => {
        console.log('OS notification closed');
      };

      return true;
    } catch (error) {
      console.error('Error showing OS notification:', error);
      return false;
    }
  }

  // Hybrid Notification Method (Main method to use)
  async showNotification(title, message, options = {}) {
    const results = {
      toast: false,
      os: false
    };

    // Show toast notification if enabled
    if (this.preferences.useToast) {
      try {
        results.toast = this.showToastNotification(title, message, options);
      } catch (error) {
        console.error('Toast notification error:', error);
      }
    }

    // Show OS notification if enabled and available
    if (this.preferences.useOS) {
      try {
        results.os = await this.showOSNotification(title, {
          body: message,
          ...options
        });
      } catch (error) {
        console.error('OS notification error:', error);
      }
    }

    console.log('Hybrid notification results:', results);
    return results;
  }

  // Permission Management
  async initialize() {
    if (!this.isSupported) {
      throw new Error('Notifications not supported');
    }

    if (this.permission === 'default') {
      this.permission = await Notification.requestPermission();
    }

    return this.permission === 'granted';
  }

  // Notification Management
  addNotification(time, message = 'Time to check in on your spiritual growth!') {
    const id = Date.now().toString();
    const notification = {
      id,
      time,
      message,
      enabled: true
    };

    this.notifications.push(notification);
    this.saveNotifications();
    this.scheduleNotification(notification);
    return id;
  }

  removeNotification(id) {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.saveNotifications();
    this.clearNotification(id);
  }

  updateNotification(id, time, message) {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.time = time;
      notification.message = message;
      this.saveNotifications();
      this.clearNotification(id);
      this.scheduleNotification(notification);
    }
  }

  toggleNotification(id, enabled) {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.enabled = enabled;
      this.saveNotifications();
      if (enabled) {
        this.scheduleNotification(notification);
      } else {
        this.clearNotification(id);
      }
    }
  }

  scheduleNotification(notification) {
    if (!notification.enabled) return;

    this.clearNotification(notification.id);

    const [hours, minutes] = notification.time.split(':').map(Number);
    const now = new Date();
    const scheduledTime = new Date();
    scheduledTime.setHours(hours, minutes, 0, 0);

    // If the time has passed today, schedule for tomorrow
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    const delay = scheduledTime.getTime() - now.getTime();
    
    console.log(`Scheduling hybrid notification for ${notification.time} (${scheduledTime.toLocaleString()}) in ${Math.round(delay / 1000 / 60)} minutes`);
    
    const interval = setTimeout(() => {
      console.log(`Firing hybrid notification: ${notification.message}`);
      this.showNotification('Spiritual Tracker Reminder', notification.message, {
        backgroundColor: '#0d6efd',
        icon: '⏰',
        duration: 8000
      });
      // Schedule for next day
      this.scheduleNotification(notification);
    }, delay);

    this.intervals.set(notification.id, interval);
  }

  clearNotification(id) {
    const interval = this.intervals.get(id);
    if (interval) {
      clearTimeout(interval);
      this.intervals.delete(id);
    }
  }

  getNotifications() {
    return this.notifications;
  }

  getPreferences() {
    return this.preferences;
  }

  scheduleAllNotifications() {
    console.log('Scheduling all hybrid notifications:', this.notifications);
    this.notifications.forEach(notification => {
      if (notification.enabled) {
        this.scheduleNotification(notification);
      }
    });
  }

  clearAllNotifications() {
    this.intervals.forEach(interval => clearTimeout(interval));
    this.intervals.clear();
  }

  // Test Methods
  async testToastNotification() {
    console.log('=== TOAST NOTIFICATION TEST ===');
    const notifications = [
      {
        title: 'Toast Test 1',
        message: 'First toast notification - in browser only!',
        type: 'success'
      },
      {
        title: 'Toast Test 2', 
        message: 'Second toast notification - check top-right corner!',
        type: 'info'
      }
    ];
    
    for (let i = 0; i < notifications.length; i++) {
      const notification = notifications[i];
      console.log(`Sending toast notification ${i + 1}:`, notification.title);
      
      switch (notification.type) {
        case 'success':
          this.showToastSuccess(notification.title, notification.message);
          break;
        case 'info':
          this.showToastInfo(notification.title, notification.message);
          break;
        default:
          this.showToastNotification(notification.title, notification.message);
      }
      
      if (i < notifications.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    console.log('Toast notifications sent successfully');
    return true;
  }

  async testOSNotification() {
    console.log('=== OS NOTIFICATION TEST ===');
    console.log('Browser:', navigator.userAgent);
    console.log('OS notification support:', this.isSupported);
    console.log('Permission status:', this.permission);
    
    if (!this.isSupported) {
      console.log('OS notifications not supported in this browser');
      return false;
    }

    if (this.permission !== 'granted') {
      console.log('OS notification permission not granted');
      return false;
    }

    const result = await this.showOSNotification('OS Notification Test', {
      body: 'This is a test OS notification - check your system notification area!',
      tag: 'test-os-notification',
      icon: '/icons/icon-192x192.png'
    });

    console.log('OS notification test result:', result);
    return result;
  }

  async testHybridNotification() {
    console.log('=== HYBRID NOTIFICATION TEST ===');
    console.log('Browser:', navigator.userAgent);
    console.log('Current time:', new Date().toLocaleString());
    console.log('Preferences:', this.preferences);
    
    const result = await this.showNotification('Hybrid Test', 'Testing both toast and OS notifications!', {
      backgroundColor: '#0d6efd',
      icon: '🔔'
    });

    console.log('Hybrid notification test result:', result);
    return result;
  }
}

const hybridNotificationService = new HybridNotificationService();
export default hybridNotificationService; 