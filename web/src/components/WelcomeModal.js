import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const WelcomeModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered className="welcome-modal">
      <Modal.Header style={{ backgroundColor: '#0d6efd', color: 'white' }}>
        <Modal.Title>
          <i className="bi bi-heart-fill me-2" style={{ color: 'white' }}></i>
          Welcome to Spiritual Tracker!
        </Modal.Title>
        <button
          type="button"
          className="btn-close"
          onClick={onHide}
          style={{ filter: 'brightness(0) invert(1)' }}
        ></button>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <h5>Track Your Spiritual Growth</h5>
            <p>This app helps you monitor and improve your spiritual life through:</p>
            <ul>
              <li><strong>Fruits of the Spirit:</strong> Track positive spiritual qualities</li>
              <li><strong>Works of the Flesh:</strong> Identify areas for improvement</li>
              <li><strong>Seven Deadly Sins:</strong> Monitor sinful behaviors</li>
              <li><strong>Spiritual Armor:</strong> Ensure you're fully equipped</li>
            </ul>
          </div>
          <div className="col-md-6">
            <h5>Getting Started</h5>
            <ol>
              <li>Select today's date</li>
              <li>Choose a section to track</li>
              <li>Check off items that apply</li>
              <li>Review your progress in Analytics</li>
              <li>Use Settings to manage your data</li>
            </ol>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          Get Started
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WelcomeModal;
