import React, { useState } from 'react';
import { WORKS_OF_FLESH } from '../shared/constants/data';
import FleshDefinitionsModal from './FleshDefinitionsModal';

const FleshSection = ({ selectedFlesh, onFleshToggle }) => {
  const [showDefinitions, setShowDefinitions] = useState(false);

  return (
    <div className="fade-in flesh-section">
      {selectedFlesh.length > 0 && (
        <div className="row justify-content-center mb-3">
          <div className="col-12" style={{ maxWidth: '520px' }}>
            <div className="alert alert-warning">
              <i className="bi bi-exclamation-triangle me-2"></i>
              Take time to reflect and repent of these works of the flesh.
            </div>
          </div>
        </div>
      )}
      
      <div className="row justify-content-center">
        <div className="col-12" style={{ maxWidth: '520px' }}>
          <div 
            className="d-flex flex-column gap-2 flesh-form-container"
            style={{
              backgroundColor: '#e3f2fd',
              borderRadius: '8px',
              padding: '1rem 1rem',
              marginBottom: '1rem'
            }}
          >
            <div className="text-center mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div></div>
                <h3>Works of the Flesh</h3>
                <small className="text-muted">Galatians 5:19-21</small>
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
              <p className="text-muted mt-3 mb-0">Which Works of the Flesh were evident in your life today? Click on each work that was manifested.</p>
            </div>
            {WORKS_OF_FLESH.map((work) => (
              <div
                key={work}
                className={`flesh-item card ${selectedFlesh.includes(work) ? 'selected' : ''}`}
                onClick={() => onFleshToggle(work)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body d-flex align-items-center">
                  <div className="flex-grow-1">
                    <strong>{work.charAt(0).toUpperCase() + work.slice(1)}</strong>
                  </div>
                  <div className="ms-2">
                    {selectedFlesh.includes(work) && (
                      <span className="badge bg-info">
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
              <div className="progress-circle flesh mb-3">
                {selectedFlesh.length}
              </div>
              <small className="text-muted">
                Works of the flesh identified
              </small>
            </div>
          </div>
        </div>
      </div>
      
      <FleshDefinitionsModal 
        show={showDefinitions} 
        onHide={() => setShowDefinitions(false)} 
      />
    </div>
  );
};

export default FleshSection;
