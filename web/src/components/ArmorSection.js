import React, { useState } from 'react';
import { SPIRITUAL_ARMOR } from '../shared/constants/data';
import ArmorDefinitionsModal from './ArmorDefinitionsModal';

const ArmorSection = ({ selectedArmor, onArmorToggle }) => {
  const [showDefinitions, setShowDefinitions] = useState(false);
  const missingArmor = SPIRITUAL_ARMOR.filter(armor => !selectedArmor.includes(armor));

  return (
    <div className="fade-in armor-section">
      {missingArmor.length > 0 && (
        <div className="row justify-content-center mb-3">
          <div className="col-12" style={{ maxWidth: '520px' }}>
            <div className="alert alert-warning">
              <i className="bi bi-exclamation-triangle me-2"></i>
              Missing armor pieces: {missingArmor.join(', ')}
            </div>
          </div>
        </div>
      )}
      
      <div className="row justify-content-center">
        <div className="col-12" style={{ maxWidth: '520px' }}>
          <div 
            className="d-flex flex-column gap-2 armor-form-container"
            style={{
              backgroundColor: '#fff8e1',
              borderRadius: '8px',
              padding: '1rem 1rem',
              marginBottom: '1rem'
            }}
          >
            <div className="text-center mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div></div>
                <h3>Spiritual Armor</h3>
                <small className="text-muted">Ephesians 6:10-18</small>
                <button
                  className="btn btn-link btn-sm p-0"
                  onClick={() => setShowDefinitions(true)}
                  title="View definitions and scriptures"
                  style={{
                    border: 'none',
                    color: '#52585D',
                    textDecoration: 'none'
                  }}
                >
                  <i className="bi bi-info-circle-fill" style={{ fontSize: '1.5rem' }}></i>
                </button>
              </div>
              <p className="text-muted mt-3 mb-0">Which pieces of Spiritual Armor did you put on today? Click on each armor piece that you actively used.</p>
            </div>
            {SPIRITUAL_ARMOR.map((armor) => (
              <div
                key={armor}
                className={`armor-item card ${selectedArmor.includes(armor) ? 'selected' : ''}`}
                onClick={() => onArmorToggle(armor)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body d-flex align-items-center">
                  <div className="flex-grow-1">
                    <strong>{armor.charAt(0).toUpperCase() + armor.slice(1)}</strong>
                  </div>
                  <div className="ms-2">
                    {selectedArmor.includes(armor) && (
                      <span className="badge bg-warning">
                        ✓
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="row justify-content-center mt-4">
        <div className="col-12" style={{ maxWidth: '520px' }}>
          <div className="card">
            <div className="card-body text-center">
              <h5>Today's Count</h5>
              <div className="progress-circle armor mb-3">
                {selectedArmor.length}
              </div>
              <small className="text-muted">
                Armor pieces equipped today
              </small>
            </div>
          </div>
        </div>
      </div>
      
      <ArmorDefinitionsModal 
        show={showDefinitions} 
        onHide={() => setShowDefinitions(false)} 
      />
    </div>
  );
};

export default ArmorSection;
