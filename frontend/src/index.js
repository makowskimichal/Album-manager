import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { transitions, positions, types, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-oldschool-dark'
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} position={positions.BOTTOM_RIGHT} type={types.SUCCESS} timeout={5000}>
      <App />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
