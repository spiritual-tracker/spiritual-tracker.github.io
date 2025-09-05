import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { SIN_DEFINITIONS, SIN_SCRIPTURES, SIN_COMPARISON_TABLE } from '../shared/constants/data';

const SinsDefinitionsModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size="xl" className="sins-definitions-modal">
      <div className="modal-header text-center" style={{ backgroundColor: '#dc3545', color: 'white' }}>
        <h5 className="modal-title w-100">Seven Deadly Sins - Definitions & Scriptures</h5>
        <button type="button" className="btn-close btn-close-white" onClick={onHide}></button>
      </div>
      <Modal.Body>
        <div className="definitions-container">
          {Object.entries(SIN_DEFINITIONS).map(([key, definition]) => {
            // Normalize the key to match the comparison table format
            const normalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
            const comparisonData = SIN_COMPARISON_TABLE.find(item => 
              item.sin.toLowerCase().includes(key.toLowerCase()) || 
              key.toLowerCase().includes(item.sin.toLowerCase().split(' ')[0])
            );
            
            return (
              <div key={key} className="definition-item mb-4">
                <h5 className="definition-title text-danger">
                  {normalizedKey}
                </h5>
                <p className="definition-text mb-2">{definition}</p>
                
                <div className="comparison-details mb-3">
                  <div className="mb-2">
                    <strong>Related Commandment(s):</strong> {comparisonData?.commandments || 'N/A'}
                  </div>
                  <div className="mb-2">
                    <strong>Contrast/Overlap:</strong> {comparisonData?.contrast || 'N/A'}
                  </div>
                </div>
                
                <div className="scriptures-section">
                  <h6 className="fw-bold text-muted">Key Scriptures:</h6>
                  <ul className="list-unstyled">
                    {SIN_SCRIPTURES[key].map((scripture, index) => (
                      <li key={index} className="mb-3">
                        <blockquote className="blockquote">
                          <p className="mb-1">{scripture.text}</p>
                          <footer className="blockquote-footer mt-3">{scripture.reference}</footer>
                        </blockquote>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SinsDefinitionsModal; 