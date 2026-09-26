import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage.js';
import RegisterPage from './components/RegisterPage/RegisterPage.js';
import DashboardPage from './components/DashboardPage/DashboardPage.js';

function App() {
  return React.createElement(
    BrowserRouter,
    null,
    React.createElement(
      Routes,
      null,
      React.createElement(Route, { path: '/', element: React.createElement(LoginPage) }),
      React.createElement(Route, { path: '/register', element: React.createElement(RegisterPage) }),
      React.createElement(Route, { path: '/app', element: React.createElement(DashboardPage) })
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(React.StrictMode, null, React.createElement(App))
);
