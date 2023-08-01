import React, { FC, ReactNode, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const ScrollToTop: FC<{ children: JSX.Element }> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children || null;
};

root.render(
  <Router>
    <ScrollToTop>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ScrollToTop>
  </Router>
);
