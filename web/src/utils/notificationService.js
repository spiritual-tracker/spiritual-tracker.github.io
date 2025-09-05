class NotificationService {
  constructor() {
    this.isSupported = 'Notification' in window;
    this.permission = this.isSupported ? Notification.permission : 'denied';
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

  async initialize() {
    if (!this.isSupported) {
      throw new Error('Notifications not supported');
    }

    if (this.permission === 'default') {
      this.permission = await Notification.requestPermission();
    }

    return this.permission === 'granted';
  }

  async showNotification(title, options = {}) {
    if (this.permission !== 'granted') {
      console.log('Notification permission not granted:', this.permission);
      return false;
    }

    try {
      console.log('Creating notification with options:', { title, ...options });
      
      const notification = new Notification(title, {
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-192x192.png',
        requireInteraction: true, // Keep notification visible until user interacts
        silent: false, // Play notification sound
        vibrate: [200, 100, 200], // Vibration pattern for mobile
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
        console.log('Notification clicked');
        window.focus(); // Focus the window when notification is clicked
        notification.close();
      };

      notification.onshow = () => {
        console.log('Notification shown successfully');
      };

      notification.onerror = (error) => {
        console.error('Notification error:', error);
      };

      notification.onclose = () => {
        console.log('Notification closed');
      };

      return true;
    } catch (error) {
      console.error('Error showing notification:', error);
      return false;
    }
  }

  async showDailyReminder() {
    return this.showNotification('Spiritual Tracker Reminder', {
      body: 'Take a moment to reflect on your spiritual growth today.',
      tag: 'daily-reminder'
    });
  }

  async showWeeklyReport() {
    return this.showNotification('Weekly Spiritual Report', {
      body: 'Review your spiritual progress for this week.',
      tag: 'weekly-report'
    });
  }

  async showEncouragement() {
    const encouragements = [
      'Keep growing in faith!',
      'You are making progress in your spiritual journey.',
      'God is working in your life.',
      'Stay strong in your faith!'
    ];

    const message = encouragements[Math.floor(Math.random() * encouragements.length)];
    
    return this.showNotification('Spiritual Encouragement', {
      body: message,
      tag: 'encouragement'
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
    
    console.log(`Scheduling notification for ${notification.time} (${scheduledTime.toLocaleString()}) in ${Math.round(delay / 1000 / 60)} minutes`);
    
    const interval = setTimeout(() => {
      console.log(`Firing notification: ${notification.message}`);
      this.showNotification('Spiritual Tracker Reminder', {
        body: notification.message,
        tag: `reminder-${notification.id}`,
        icon: '/icons/icon-192x192.png'
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
    console.log('Scheduling all notifications:', this.notifications);
    this.notifications.forEach(notification => {
      if (notification.enabled) {
        this.scheduleNotification(notification);
      }
    });
  }

  // Test notification method for debugging
  async testNotification() {
    console.log('=== NOTIFICATION TEST START ===');
    console.log('Browser:', navigator.userAgent);
    console.log('Notification support:', this.isSupported);
    console.log('Permission status:', this.permission);
    console.log('Current time:', new Date().toLocaleString());
    
    // Check if we're in Firefox
    const isFirefox = navigator.userAgent.includes('Firefox');
    console.log('Is Firefox:', isFirefox);
    
    if (isFirefox) {
      console.log('Firefox notification tips:');
      console.log('1. Check about:preferences#privacy > Permissions > Notifications');
      console.log('2. Make sure the site is not blocked');
      console.log('3. Check if "Block new requests" is unchecked');
      console.log('4. Look for notifications in the top-right corner or notification center');
    }
    
    // Send multiple test notifications to make them more visible
    const notifications = [
      {
        title: 'Spiritual Tracker Test 1',
        body: 'First test notification - should be visible!',
        tag: 'test-notification-1'
      },
      {
        title: 'Spiritual Tracker Test 2', 
        body: 'Second test notification - check your notification area!',
        tag: 'test-notification-2'
      }
    ];
    
    let results = [];
    for (let i = 0; i < notifications.length; i++) {
      const notification = notifications[i];
      console.log(`Sending notification ${i + 1}:`, notification.title);
      
      const result = await this.showNotification(notification.title, {
        body: notification.body,
        tag: notification.tag,
        icon: '/icons/icon-192x192.png'
      });
      
      results.push(result);
      
      // Wait a bit between notifications
      if (i < notifications.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    const allSuccessful = results.every(r => r === true);
    console.log('All test notifications sent successfully:', allSuccessful);
    console.log('=== NOTIFICATION TEST END ===');
    return allSuccessful;
  }

  clearAllNotifications() {
    this.intervals.forEach(interval => clearTimeout(interval));
    this.intervals.clear();
  }
}

const notificationService = new NotificationService();
export default notificationService;
