import React from 'react';
import { APP_CONFIG } from '../shared/constants/data';

const NavigationTabs = ({ activeSection, onSectionChange }) => {

  return (
    <div className="navigation-container">
      {/* Desktop Navigation */}
      <ul className="nav nav-tabs d-none d-md-flex justify-content-center flex-wrap" id="mainTabs" role="tablist">
        {APP_CONFIG.sections.map((section) => (
          <li className="nav-item" role="presentation" key={section.id}>
            <button
              className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => onSectionChange(section.id)}
              type="button"
              role="tab"
            >
              <i className={`bi ${section.icon} me-2`}></i>
              {section.name}
            </button>
          </li>
        ))}
      </ul>

      {/* Mobile Navigation */}
      <ul className="nav nav-tabs d-flex d-md-none justify-content-center flex-wrap" id="mainTabsMobile" role="tablist">
        {APP_CONFIG.sections.map((section) => (
          <li className="nav-item" role="presentation" key={section.id}>
            <button
              className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => onSectionChange(section.id)}
              type="button"
              role="tab"
            >
              <i className={`bi ${section.icon} me-2`}></i>
              {section.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavigationTabs;
