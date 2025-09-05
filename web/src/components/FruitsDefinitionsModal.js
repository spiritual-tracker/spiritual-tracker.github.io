import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FRUITS_OF_SPIRIT, FRUIT_DEFINITIONS, FRUIT_SCRIPTURES } from '../shared/constants/data';

const FruitsDefinitionsModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size="xl" className="fruits-definitions-modal">
      <div className="modal-header text-center" style={{ backgroundColor: '#28a744', color: 'white' }}>
        <h5 className="modal-title w-100">Fruits of the Spirit - Definitions & Scriptures</h5>
        <button type="button" className="btn-close" onClick={onHide} style={{ filter: 'brightness(0) invert(1)' }}></button>
      </div>
      <Modal.Body>
        <div className="definitions-list" style={{ maxHeight: '500px', overflowY: 'auto' }}>
          {FRUITS_OF_SPIRIT.map((fruit) => (
            <div key={fruit} className="definition-item mb-4">
              <h5 className="text-success mb-3">{fruit.charAt(0).toUpperCase() + fruit.slice(1)}</h5>
              <div className="mb-3">
                <h6 className="text-muted mb-2">Definition:</h6>
                <p className="text-dark">{FRUIT_DEFINITIONS[fruit]}</p>
              </div>
              <div>
                <h6 className="text-muted mb-2">Scripture:</h6>
                <blockquote className="blockquote">
                  <p className="mb-1">{FRUIT_SCRIPTURES[fruit]}</p>
                  <footer className="blockquote-footer mt-3">Galatians 5:22-23</footer>
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

export default FruitsDefinitionsModal; 