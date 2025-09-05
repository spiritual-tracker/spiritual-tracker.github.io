import React, { useState } from 'react';
import { SEVEN_DEADLY_SINS } from '../shared/constants/data';
import SinsDefinitionsModal from './SinsDefinitionsModal';

const SinsSection = ({ selectedSins, onSinToggle }) => {
  const [showDefinitions, setShowDefinitions] = useState(false);

  return (
    <div className="fade-in sins-section">
      {selectedSins.length > 0 && (
        <div className="row justify-content-center mb-3">
          <div className="col-12" style={{ maxWidth: '520px' }}>
            <div className="alert alert-warning">
              <i className="bi bi-exclamation-triangle me-2"></i>
              Focus on repentance and recovery from these sins.
            </div>
          </div>
        </div>
      )}
      
      <div className="row justify-content-center">
        <div className="col-12" style={{ maxWidth: '520px' }}>
          <div 
            className="d-flex flex-column gap-2 sins-form-container"
            style={{
              backgroundColor: '#ffe6e6',
              borderRadius: '8px',
              padding: '1rem 1rem',
              marginBottom: '1rem'
            }}
          >
            <div className="text-center mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div></div>
                <h3>Seven Deadly Sins</h3>
                <small className="text-muted">Proverbs 6:16-19</small>
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
              <p className="text-muted mt-3 mb-0">Which of the Seven Deadly Sins did you struggle with today? Click on each sin that was evident in your life.</p>
            </div>
            {SEVEN_DEADLY_SINS.map((sin) => (
              <div
                key={sin}
                className={`sin-item card ${selectedSins.includes(sin) ? 'selected' : ''}`}
                onClick={() => onSinToggle(sin)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body d-flex align-items-center">
                  <div className="flex-grow-1">
                    <strong>{sin.charAt(0).toUpperCase() + sin.slice(1)}</strong>
                  </div>
                  <div className="ms-2">
                    {selectedSins.includes(sin) && (
                      <span className="badge bg-danger">
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
              <div className="progress-circle sins mb-3">
                {selectedSins.length}
              </div>
              <small className="text-muted">
                Sins identified today
              </small>
            </div>
          </div>
        </div>
      </div>
      
      <SinsDefinitionsModal 
        show={showDefinitions} 
        onHide={() => setShowDefinitions(false)} 
      />
    </div>
  );
};

export default SinsSection;
