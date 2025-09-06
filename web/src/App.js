import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

// Import components
import DateNavigation from './components/DateNavigation';
import FruitsSection from './components/FruitsSection';
import FleshSection from './components/FleshSection';
import SinsSection from './components/SinsSection';
import ArmorSection from './components/ArmorSection';
import AnalyticsSection from './components/AnalyticsSection';
import SettingsSection from './components/SettingsSection';
import NavigationTabs from './components/NavigationTabs';
import WelcomeModal from './components/WelcomeModal';
import InstallPWAModal from './components/InstallPWAModal';

// Import utilities and constants
import { formatDate } from './shared/utils/dateUtils';
import hybridNotificationService from './utils/hybridNotificationService';

function AppContent() {
  // Initialize selectedDate from localStorage or default to today
  const [selectedDate, setSelectedDate] = useState(() => {
    const savedDate = localStorage.getItem('spiritual_tracker_selected_date');
    return savedDate || formatDate(new Date());
  });
  const [data, setData] = useState({
    fruits: [],
    flesh: [],
    sins: [],
    armor: []
  });
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [buildVersion, setBuildVersion] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get current section from URL path
  const currentSection = location.pathname.substring(1) || 'armor';

  // Load data for the selected date
  useEffect(() => {
    const existingData = localStorage.getItem(`spiritual_tracker_${selectedDate}`);
    if (existingData) {
      setData(JSON.parse(existingData));
    } else {
      setData({ fruits: [], flesh: [], sins: [], armor: [] });
    }
  }, [selectedDate]);

  // Get build version from environment variable
  useEffect(() => {
    const envVersion = process.env.REACT_APP_BUILD_VERSION || process.env.GIT_COMMIT_HASH;
    if (envVersion) {
      // Take only the first 8 characters of the git commit hash for a shorter version
      const shortVersion = envVersion.length > 8 ? envVersion.substring(0, 8) : envVersion;
      setBuildVersion(shortVersion);
    } else {
      setBuildVersion('dev');
    }
  }, []);

  // Initialize notification service and check for first-time usage
  useEffect(() => {
    const initApp = async () => {
      try {
        await hybridNotificationService.initialize();
        
        // Check if this is the first time using the app
        const welcomeModalShown = localStorage.getItem('spiritual_tracker_welcome_shown');
        if (!welcomeModalShown) {
          setShowWelcomeModal(true);
        }
      } catch (error) {
        // Still check for first-time usage even if notifications fail
        const welcomeModalShown = localStorage.getItem('spiritual_tracker_welcome_shown');
        if (!welcomeModalShown) {
          setShowWelcomeModal(true);
        }
      }
    };

    initApp();
  }, []);

  // Save data to localStorage
  const saveData = (newData) => {
    setData(newData);
    localStorage.setItem(`spiritual_tracker_${selectedDate}`, JSON.stringify(newData));
  };

  // Handle fruit selection
  const handleFruitToggle = (fruit) => {
    const newFruits = data.fruits.includes(fruit)
      ? data.fruits.filter(f => f !== fruit)
      : [...data.fruits, fruit];
    saveData({ ...data, fruits: newFruits });
  };

  // Handle flesh work selection
  const handleFleshToggle = (work) => {
    const newFlesh = data.flesh.includes(work)
      ? data.flesh.filter(w => w !== work)
      : [...data.flesh, work];
    saveData({ ...data, flesh: newFlesh });
  };

  // Handle sin selection
  const handleSinToggle = (sin) => {
    const newSins = data.sins.includes(sin)
      ? data.sins.filter(s => s !== sin)
      : [...data.sins, sin];
    saveData({ ...data, sins: newSins });
  };

  // Handle armor selection
  const handleArmorToggle = (armor) => {
    const newArmor = data.armor.includes(armor)
      ? data.armor.filter(a => a !== armor)
      : [...data.armor, armor];
    saveData({ ...data, armor: newArmor });
  };

  // Handle date change
  const handleDateChange = (dateStr) => {
    setSelectedDate(dateStr);
    // Save the selected date to localStorage for persistence
    localStorage.setItem('spiritual_tracker_selected_date', dateStr);
  };

  // Handle section change
  const handleSectionChange = (section) => {
    navigate(`/${section}`);
  };

  // Render the active section
  const renderActiveSection = () => {
    switch (currentSection) {
      case 'fruits':
        return (
          <FruitsSection 
            selectedFruits={data.fruits}
            onFruitToggle={handleFruitToggle}
          />
        );
      case 'flesh':
        return (
          <FleshSection 
            selectedFlesh={data.flesh}
            onFleshToggle={handleFleshToggle}
          />
        );
      case 'sins':
        return (
          <SinsSection 
            selectedSins={data.sins}
            onSinToggle={handleSinToggle}
          />
        );
      case 'armor':
        return (
          <ArmorSection 
            selectedArmor={data.armor}
            onArmorToggle={handleArmorToggle}
          />
        );
      case 'analytics':
        return (
          <AnalyticsSection 
            selectedDate={selectedDate}
            data={data}
          />
        );
      case 'settings':
        return (
          <SettingsSection 
            buildVersion={buildVersion}
            onShowInstallModal={() => setShowInstallModal(true)}
          />
        );
      default:
        return (
          <ArmorSection 
            selectedArmor={data.armor}
            onArmorToggle={handleArmorToggle}
          />
        );
    }
  };

  return (
    <div className="container-fluid p-0">
      {/* Navigation Header */}
      <header className="border-bottom shadow-sm" style={{ backgroundColor: '#FBFBFB' }}>
        <div className="container">
          {/* App Icon - Centered above navigation */}
          <div className="row justify-content-center py-3">
            <div className="col-auto text-center">
              <img 
                src="%PUBLIC_URL%/icons/icon-96x96.png" 
                alt="Spiritual Tracker Icon" 
                style={{ 
                  width: '64px', 
                  height: '64px',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
                onError={(e) => {
                  console.log('Icon failed to load:', e.target.src);
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
          {/* Navigation Tabs */}
          <div className="row">
            <div className="col-12">
              <NavigationTabs 
                activeSection={currentSection}
                onSectionChange={handleSectionChange}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Date Navigation */}
      {currentSection !== 'analytics' && currentSection !== 'settings' && (
        <div className="bg-light border-bottom">
          <div className="container py-2">
            <DateNavigation 
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
              currentSection={currentSection}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container py-4">
        {/* Section Content */}
        <div>
          {renderActiveSection()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-light border-top py-3 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <small className="text-muted">
                                  © {new Date().getFullYear()} Spiritual Tracker. All rights reserved.
              </small>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <WelcomeModal 
        show={showWelcomeModal}
        onHide={() => {
          setShowWelcomeModal(false);
          localStorage.setItem('spiritual_tracker_welcome_shown', 'true');
        }}
      />

      <InstallPWAModal 
        show={showInstallModal}
        onHide={() => setShowInstallModal(false)}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/armor" replace />} />
        <Route path="/armor" element={<AppContent />} />
        <Route path="/sins" element={<AppContent />} />
        <Route path="/fruits" element={<AppContent />} />
        <Route path="/flesh" element={<AppContent />} />
        <Route path="/analytics" element={<AppContent />} />
        <Route path="/settings" element={<AppContent />} />
      </Routes>
    </Router>
  );
}

export default App;
