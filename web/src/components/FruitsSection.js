import React, { useState } from 'react';
import { FRUITS_OF_SPIRIT } from '../shared/constants/data';
import FruitsDefinitionsModal from './FruitsDefinitionsModal';

const FruitsSection = ({ selectedFruits, onFruitToggle }) => {
  const [showDefinitions, setShowDefinitions] = useState(false);

  return (
    <div className="fade-in fruits-section">
      <div className="row justify-content-center">
        <div className="col-12" style={{ maxWidth: '520px' }}>
          <div 
            className="d-flex flex-column gap-2 fruits-form-container"
            style={{
              backgroundColor: '#e8f5e8',
              borderRadius: '8px',
              padding: '1rem 1rem',
              marginBottom: '1rem'
            }}
          >
            <div className="text-center mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div></div>
                <h3>Fruits of the Spirit</h3>
                <small className="text-muted">Galatians 5:22-23</small>
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
              <p className="text-muted mt-3 mb-0">Which Fruits of the Spirit were evident in your life today? Click on each fruit that was manifested.</p>
            </div>
            {FRUITS_OF_SPIRIT.map((fruit) => (
              <div
                key={fruit}
                className={`fruit-item card ${selectedFruits.includes(fruit) ? 'selected' : ''}`}
                onClick={() => onFruitToggle(fruit)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body d-flex align-items-center">
                  <div className="flex-grow-1">
                    <strong>{fruit.charAt(0).toUpperCase() + fruit.slice(1)}</strong>
                  </div>
                  <div className="ms-2">
                    {selectedFruits.includes(fruit) && (
                      <span className="badge bg-success">
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
              <div className="progress-circle fruits mb-3">
                {selectedFruits.length}
              </div>
              <small className="text-muted">
                Fruits manifested today
              </small>
            </div>
          </div>
        </div>
      </div>
      
      <FruitsDefinitionsModal 
        show={showDefinitions} 
        onHide={() => setShowDefinitions(false)} 
      />
    </div>
  );
};

export default FruitsSection;
