import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '../style.css';

const routes = () => {
  let productId = window.location.href.split('/')[4];
  // if productId is valid
    // return productId
  // else
    // return default productId
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);