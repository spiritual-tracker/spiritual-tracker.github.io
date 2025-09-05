import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

class ToastNotificationService {
  constructor() {
    this.notifications = this.loadNotifications();
    this.intervals = new Map();
  }

  loadNotifications() {
    const saved = localStorage.getItem('spiritual_tracker_notifications');
    return saved ? JSON.parse(saved) : [];
  }

  saveNotifications() {
    localStorage.setItem('spiritual_tracker_notifications', JSON.stringify(this.notifications));
  }

  showNotification(title, message, options = {}) {
    const defaultOptions = {
      text: `${title}\n${message}`,
      duration: 5000,
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

  showSuccessNotification(title, message) {
    return this.showNotification(title, message, {
      backgroundColor: '#28a744',
      icon: '✅'
    });
  }

  showWarningNotification(title, message) {
    return this.showNotification(title, message, {
      backgroundColor: '#ffc107',
      color: '#212529',
      icon: '⚠️'
    });
  }

  showErrorNotification(title, message) {
    return this.showNotification(title, message, {
      backgroundColor: '#dc3545',
      icon: '❌'
    });
  }

  showInfoNotification(title, message) {
    return this.showNotification(title, message, {
      backgroundColor: '#17a2b8',
      icon: 'ℹ️'
    });
  }

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
    
    console.log(`Scheduling toast notification for ${notification.time} (${scheduledTime.toLocaleString()}) in ${Math.round(delay / 1000 / 60)} minutes`);
    
    const interval = setTimeout(() => {
      console.log(`Firing toast notification: ${notification.message}`);
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

  scheduleAllNotifications() {
    console.log('Scheduling all toast notifications:', this.notifications);
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

  // Test notification method for debugging
  async testNotification() {
    console.log('=== TOAST NOTIFICATION TEST START ===');
    console.log('Browser:', navigator.userAgent);
    console.log('Current time:', new Date().toLocaleString());
    
    // Send multiple test notifications to make them more visible
    const notifications = [
      {
        title: 'Spiritual Tracker Test 1',
        message: 'First test notification - should be visible in browser!',
        type: 'success'
      },
      {
        title: 'Spiritual Tracker Test 2', 
        message: 'Second test notification - check the top-right corner!',
        type: 'info'
      }
    ];
    
    let results = [];
    for (let i = 0; i < notifications.length; i++) {
      const notification = notifications[i];
      console.log(`Sending toast notification ${i + 1}:`, notification.title);
      
      let result;
      switch (notification.type) {
        case 'success':
          result = this.showSuccessNotification(notification.title, notification.message);
          break;
        case 'info':
          result = this.showInfoNotification(notification.title, notification.message);
          break;
        default:
          result = this.showNotification(notification.title, notification.message);
      }
      
      results.push(result);
      
      // Wait a bit between notifications
      if (i < notifications.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    console.log('All toast notifications sent successfully');
    console.log('=== TOAST NOTIFICATION TEST END ===');
    return true;
  }
}

const toastNotificationService = new ToastNotificationService();
export default toastNotificationService; 