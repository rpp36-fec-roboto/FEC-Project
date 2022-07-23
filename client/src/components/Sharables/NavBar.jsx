import React from 'react';

const NavBar = ({ isInLightMode, changeColorScheme }) => {
  var navColor = isInLightMode ? 'dark-mode' : 'light-mode';
  return (
    <div className={'nav' + navColor}>
      <button onClick={changeColorScheme}>{isInLightMode ? 'Dark Theme' : 'Light Theme'}</button>
    </div>
  );
};

export default NavBar;