import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ARMOR_DEFINITIONS, ARMOR_SCRIPTURES, ARMOR_APPLICATIONS, EPHESIANS_6_10_18 } from '../shared/constants/data';

const ArmorDefinitionsModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size="xl" className="armor-definitions-modal">
      <div className="modal-header text-center" style={{ backgroundColor: '#ffc107', color: 'white' }}>
        <h5 className="modal-title w-100">Armor of God - Definitions & Scriptures</h5>
        <button type="button" className="btn-close" onClick={onHide} style={{ filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(40deg)' }}></button>
      </div>
      <Modal.Body>
        <div className="definitions-container">
          {/* Ephesians 6:10-18 Scripture */}
          <div className="mb-4 p-3 bg-light rounded">
            <div dangerouslySetInnerHTML={{ __html: EPHESIANS_6_10_18 }} />
          </div>
          
          <hr className="my-4" />
          
          <h5 className="mb-3">🛡️ Breakdown & Definitions of Each Part of the Armor</h5>
          
          {Object.entries(ARMOR_DEFINITIONS).map(([key, definition]) => (
            <div key={key} className="definition-item mb-4">
              <h5 className="definition-title text-warning">
                {key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </h5>
              <p className="definition-text mb-2">{definition}</p>
              <div className="application-section mb-2">
                <h6 className="text-muted">Application:</h6>
                <p className="text-dark"><em>{ARMOR_APPLICATIONS[key]}</em></p>
              </div>
              <div className="scriptures-section">
                <h6 className="text-muted">Key Scriptures:</h6>
                <ul className="list-unstyled">
                  {ARMOR_SCRIPTURES[key].map((scripture, index) => (
                    <li key={index} className="mb-1">
                      <em className="text-dark">{scripture}</em>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ArmorDefinitionsModal; 