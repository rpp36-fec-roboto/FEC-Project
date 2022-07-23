import React from 'react';

const NavBar = ({ isInLightMode, changeColorScheme }) => {
  var navColor = isInLightMode ? 'dark-mode' : 'light-mode';
  return (
    <div className={'nav ' + navColor}>
      {/* <button onClick={changeColorScheme} className="toggle">{isInLightMode ? 'Dark' : 'Light'}</button> */}
      <div className="toggle-container" onClick={changeColorScheme}>
        <div className={`dialog-button ${isInLightMode ? "disabled" : ""}`}>
          {isInLightMode ? "Dark" : "Light"}
        </div>
      </div>
      <h2 className={`logo ${navColor}`}>LOGO</h2>
    </div>
  );
};

export default NavBar;