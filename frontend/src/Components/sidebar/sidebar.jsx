import React, { useState } from 'react';
import './sidebar.css';


const Sidebar = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="gorkem-sidebar-container">
      <div className="gorkem-sidebar">
        <div className="gorkem-logo">Logo</div>
        <ul className="gorkem-options hover-zoom">
          <li
            className={`gorkem-option  ${selectedOption === 'home' ? 'active' : ''}`}
            onClick={() => setSelectedOption('home')}
          >
            <span className="gorkem-icon">
              <i className="fa fa-house" />
            </span>
            <span className="gorkem-text">Home</span>
          </li>
          <li
            className={`gorkem-option ${selectedOption === 'deneme' ? 'active' : ''}`}
            onClick={() => setSelectedOption('deneme')}
          >
            <span className="gorkem-icon">
              <i className="fa fa-file-code-o" />
            </span>
            <span className="gorkem-text">Deneme</span>
          </li>
        </ul>
        <button className="gorkem-sign-button">Sign</button>
      </div>
      <div className="gorkem-content-container">
        {/* You can put other components or content here */}
        <div className={`gorkem-selected-option ${selectedOption}`}>
          {selectedOption === 'home' && <div>Home content</div>}
          {selectedOption === 'deneme' && <div>Deneme content</div>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;