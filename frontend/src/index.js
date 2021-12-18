import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { positions, types, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-oldschool-dark'
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} position={positions.BOTTOM_RIGHT} type={types.SUCCESS}>
      <App />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
