import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const InstallPWAModal = ({ show, onHide }) => {
  const handleInstall = () => {
    // This would trigger the PWA install prompt
    // For now, just show instructions
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered className="install-pwa-modal">
      <div className="modal-header text-center" style={{ backgroundColor: '#0d6efd', color: 'white' }}>
        <h5 className="modal-title w-100">
          <i className="bi bi-phone me-2"></i>
          Install Spiritual Tracker
        </h5>
        <button type="button" className="btn-close" onClick={onHide} style={{ filter: 'brightness(0) invert(1)' }}></button>
      </div>
      <Modal.Body>
        <h5>Install as a Progressive Web App</h5>
        <p>You can install this app on your device for easy access:</p>
        
        <div className="alert alert-info">
          <h6><i className="bi bi-info-circle me-2"></i>Installation Instructions:</h6>
          
          <div className="mb-3">
            <h6 className="text-primary"><i className="bi bi-laptop me-2"></i>Desktop Browsers:</h6>
            <ul className="mb-0">
              <li><strong>Chrome/Edge:</strong> Look for the <i className="bi bi-plus-circle-fill text-dark"></i> install icon in the address bar (top-right), then click "Install"</li>
              <li><strong>Firefox:</strong> Click the <i className="bi bi-house-add-fill text-primary"></i> house icon in the address bar, then "Install App"</li>
              <li><strong>Safari:</strong> Click <i className="bi bi-share-fill text-info"></i> Share button, then "Add to Dock" or "Add to Applications"</li>
            </ul>
          </div>
          
          <div className="mb-3">
            <h6 className="text-primary"><i className="bi bi-phone me-2"></i>Mobile Devices:</h6>
            <ul className="mb-0">
              <li><strong>iOS Safari:</strong> Tap <i className="bi bi-share-fill text-info"></i> Share button (bottom), then "Add to Home Screen" <i className="bi bi-house-fill text-dark"></i></li>
              <li><strong>Android Chrome:</strong> Tap <i className="bi bi-three-dots-vertical text-muted"></i> menu (top-right), then "Add to Home screen" <i className="bi bi-house-fill text-dark"></i></li>
              <li><strong>Android Firefox:</strong> Tap <i className="bi bi-three-dots-vertical text-muted"></i> menu, then "Install app" <i className="bi bi-download text-primary"></i></li>
            </ul>
          </div>
          
          <div className="mt-3 p-2 bg-light rounded">
            <small className="text-muted">
              <i className="bi bi-lightbulb me-1"></i>
              <strong>Tip:</strong> After installation, the app will appear on your home screen or desktop like a native app!
            </small>
          </div>
        </div>
        
        <p className="text-muted small">
          Once installed, the app will work offline and provide a native app experience.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Maybe Later
        </Button>
        <Button variant="primary" onClick={handleInstall}>
          Install Now
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InstallPWAModal;
