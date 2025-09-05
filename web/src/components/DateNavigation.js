import React, { useEffect, useRef } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { formatDate, getToday, getYesterday, getUserTimezone } from '../shared/utils/dateUtils';

// Function to format date in human-readable format with timezone awareness
const formatHumanDate = (dateString) => {
  const tz = getUserTimezone();
  
  // Create dates in the user's timezone
  const date = new Date(dateString + 'T12:00:00');
  const today = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  
  // Format dates in user's timezone for comparison
  const dateInTz = date.toLocaleDateString('en-CA', { timeZone: tz });
  const todayInTz = today.toLocaleDateString('en-CA', { timeZone: tz });
  const yesterdayInTz = yesterday.toLocaleDateString('en-CA', { timeZone: tz });
  
  // Check if it's today or yesterday
  if (dateInTz === todayInTz) {
    return 'Today';
  } else if (dateInTz === yesterdayInTz) {
    return 'Yesterday';
  } else {
    // Format as "Monday, January 15, 2024" in user's timezone
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: tz
    });
  }
};

const DateNavigation = ({ selectedDate, onDateChange, currentSection }) => {
  const dateInputRef = useRef(null);
  const flatpickrInstance = useRef(null);

  useEffect(() => {
    if (dateInputRef.current) {
      flatpickrInstance.current = flatpickr(dateInputRef.current, {
        dateFormat: 'Y-m-d',
        defaultDate: selectedDate,
        onChange: (selectedDates, dateStr) => {
          onDateChange(dateStr);
        },
        allowInput: true,
        clickOpens: true,
        theme: 'light'
      });
    }

    return () => {
      if (flatpickrInstance.current) {
        flatpickrInstance.current.destroy();
      }
    };
  }, [selectedDate, onDateChange]);

  useEffect(() => {
    if (flatpickrInstance.current) {
      flatpickrInstance.current.setDate(selectedDate, false);
    }
  }, [selectedDate]);

  // Hide date navigation in analytics and settings sections
  if (currentSection === 'analytics' || currentSection === 'settings') {
    return null;
  }

  const goToToday = () => {
    onDateChange(getToday());
  };

  const goToYesterday = () => {
    onDateChange(getYesterday());
  };

  const goToPreviousDay = () => {
    const currentDate = new Date(selectedDate + 'T12:00:00'); // Use noon to avoid timezone issues
    currentDate.setDate(currentDate.getDate() - 1);
    onDateChange(formatDate(currentDate));
  };

  const goToNextDay = () => {
    const currentDate = new Date(selectedDate + 'T12:00:00'); // Use noon to avoid timezone issues
    currentDate.setDate(currentDate.getDate() + 1);
    onDateChange(formatDate(currentDate));
  };

  // Check if we can navigate to next day (prevent future dates)
  const canGoToNextDay = () => {
    const today = getToday();
    return selectedDate < today;
  };

  return (
    <div className="d-flex flex-column align-items-center gap-3">
      {/* Human-readable date display */}
      <div className="text-center">
        <h4 className="mb-1 d-none d-sm-block" style={{ color: '#495057', fontWeight: '600' }}>
          {formatHumanDate(selectedDate)}
        </h4>
        <h5 className="mb-1 d-block d-sm-none" style={{ color: '#495057', fontWeight: '600' }}>
          {formatHumanDate(selectedDate)}
        </h5>
        <small className="text-muted">
          {selectedDate}
        </small>
      </div>
      
      {/* Navigation controls */}
      <div className="d-flex align-items-center justify-content-center gap-1 gap-sm-2 flex-wrap">
        <button 
          className="btn"
          onClick={goToPreviousDay}
          title="Previous day"
          style={{
            backgroundColor: '#6c757d',
            borderColor: '#6c757d',
            color: 'white',
            width: '40px',
            height: '40px',
            padding: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem'
          }}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        
        <button 
          className="btn btn-outline-primary"
          onClick={goToToday}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.9rem'
          }}
        >
          Today
        </button>
        
        <button 
          className="btn btn-outline-secondary"
          onClick={goToYesterday}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.9rem'
          }}
        >
          Yesterday
        </button>
        
        <div className="position-relative" style={{ width: 'auto' }}>
          <input
            type="text"
            className="form-control"
            value={selectedDate}
            ref={dateInputRef}
            placeholder="Select date"
            style={{ 
              paddingRight: '2.5rem',
              textAlign: 'center',
              padding: '0.5rem 2.5rem 0.5rem 0.75rem',
              fontSize: '0.9rem',
              minWidth: '120px',
              maxWidth: '140px'
            }}
          />
          <i className="bi bi-calendar3 position-absolute" 
             style={{ 
               right: '0.75rem', 
               top: '50%', 
               transform: 'translateY(-50%)', 
               color: '#6c757d',
               pointerEvents: 'none',
               fontSize: '1rem'
             }}></i>
        </div>
        
        <button 
          className="btn"
          onClick={goToNextDay}
          disabled={!canGoToNextDay()}
          title={canGoToNextDay() ? "Next day" : "Cannot navigate to future dates"}
          style={{
            backgroundColor: canGoToNextDay() ? '#6c757d' : '#e9ecef',
            borderColor: canGoToNextDay() ? '#6c757d' : '#dee2e6',
            color: canGoToNextDay() ? 'white' : '#6c757d',
            width: '40px',
            height: '40px',
            padding: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            cursor: canGoToNextDay() ? 'pointer' : 'not-allowed',
            opacity: canGoToNextDay() ? 1 : 0.6
          }}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default DateNavigation;
