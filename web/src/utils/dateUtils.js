// Date utility functions for web app

// Timezone utility functions
export const getUserTimezone = () => {
  return localStorage.getItem('spiritual_tracker_timezone') || Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const setUserTimezone = (timezone) => {
  localStorage.setItem('spiritual_tracker_timezone', timezone);
};

// Get available timezones
export const getAvailableTimezones = () => {
  return Intl.supportedValuesOf('timeZone');
};

// Format date to YYYY-MM-DD
export const formatDate = (date, timezone = null) => {
  const tz = timezone || getUserTimezone();
  try {
    return date.toLocaleDateString('en-CA', { timeZone: tz });
  } catch (error) {
    // Fallback to UTC if timezone fails
    return date.toLocaleDateString('en-CA', { timeZone: 'UTC' });
  }
};

// Get today's date
export const getToday = (timezone = null) => {
  return formatDate(new Date(), timezone);
};

// Get yesterday's date
export const getYesterday = (timezone = null) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return formatDate(yesterday, timezone);
};

// Get last 7 days
export const getLast7Days = (timezone = null) => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(formatDate(date, timezone));
  }
  return days;
};

// Get last 30 days
export const getLast30Days = (timezone = null) => {
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(formatDate(date, timezone));
  }
  return days;
};

// Format date for display (human readable)
export const formatHumanDate = (dateString, timezone = null) => {
  const tz = timezone || getUserTimezone();
  try {
    const date = new Date(dateString + 'T12:00:00');
    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

    const dateInTz = date.toLocaleDateString('en-CA', { timeZone: tz });
    const todayInTz = today.toLocaleDateString('en-CA', { timeZone: tz });
    const yesterdayInTz = yesterday.toLocaleDateString('en-CA', { timeZone: tz });

    if (dateInTz === todayInTz) {
      return 'Today';
    } else if (dateInTz === yesterdayInTz) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: tz
      });
    }
  } catch (error) {
    // Fallback formatting
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
};

// Get timezone offset in minutes
export const getTimezoneOffset = (timezone = null) => {
  const tz = timezone || getUserTimezone();
  try {
    const date = new Date();
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    const targetTime = new Date(utc + (new Date().toLocaleString("en-US", { timeZone: tz })));
    return targetTime.getTimezoneOffset();
  } catch (error) {
    return 0;
  }
};

// Check if date is today
export const isToday = (dateString, timezone = null) => {
  const tz = timezone || getUserTimezone();
  try {
    const date = new Date(dateString + 'T12:00:00');
    const today = new Date();
    
    const dateInTz = date.toLocaleDateString('en-CA', { timeZone: tz });
    const todayInTz = today.toLocaleDateString('en-CA', { timeZone: tz });
    
    return dateInTz === todayInTz;
  } catch (error) {
    return false;
  }
};

// Check if date is yesterday
export const isYesterday = (dateString, timezone = null) => {
  const tz = timezone || getUserTimezone();
  try {
    const date = new Date(dateString + 'T12:00:00');
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const dateInTz = date.toLocaleDateString('en-CA', { timeZone: tz });
    const yesterdayInTz = yesterday.toLocaleDateString('en-CA', { timeZone: tz });
    
    return dateInTz === yesterdayInTz;
  } catch (error) {
    return false;
  }
}; 