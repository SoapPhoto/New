import React, { useEffect, useRef } from 'react';
import {
  useLocation, Location, useNavigate, useNavigationType,
} from 'react-router-dom';

const ScrollToTop: React.FC = ({ children }) => {
  const location = useLocation();
  const oldLocation = useRef<Location>();
  const navigationType = useNavigationType();
  useEffect(() => {
    if (oldLocation.current) {
      if (oldLocation.current.pathname !== location.pathname && navigationType !== 'POP') {
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100);
      }
    }
    oldLocation.current = location;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return <>{children}</>;
};

export default ScrollToTop;
