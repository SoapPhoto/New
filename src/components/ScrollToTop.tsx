import React, { useEffect, useRef } from 'react';
import { useLocation, Location } from 'react-router-dom';

const ScrollToTop: React.FC = ({ children }) => {
  const location = useLocation();
  const oldLocation = useRef<Location>();
  useEffect(() => {
    if (oldLocation.current) {
      if (oldLocation.current.pathname !== location.pathname) {
        window.scrollTo(0, 0);
      }
    }
    oldLocation.current = location;
  }, [location]);

  return children;
};

export default ScrollToTop;
