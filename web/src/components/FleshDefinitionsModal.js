import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { WORKS_OF_FLESH, FLESH_DEFINITIONS, FLESH_SCRIPTURES } from '../shared/constants/data';

const FleshDefinitionsModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size="xl" className="flesh-definitions-modal">
      <div className="modal-header text-center" style={{ backgroundColor: '#316CF4', color: 'white' }}>
        <h5 className="modal-title w-100">Works of the Flesh - Definitions & Scriptures</h5>
        <button type="button" className="btn-close btn-close-white" onClick={onHide}></button>
      </div>
      <Modal.Body>
        <div className="definitions-list" style={{ maxHeight: '500px', overflowY: 'auto' }}>
          {WORKS_OF_FLESH.map((work) => (
            <div key={work} className="definition-item mb-4">
              <h5 className="text-primary mb-3">{work.charAt(0).toUpperCase() + work.slice(1)}</h5>
              <div className="mb-3">
                <h6 className="text-muted mb-2">Definition:</h6>
                <p className="text-dark">{FLESH_DEFINITIONS[work]}</p>
              </div>
              <div>
                <h6 className="text-muted mb-2">Scripture:</h6>
                <blockquote className="blockquote">
                  <p className="mb-1">{FLESH_SCRIPTURES[work]}</p>
                  <footer className="blockquote-footer mt-3">Galatians 5:19-21</footer>
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FleshDefinitionsModal; 