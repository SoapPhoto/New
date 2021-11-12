import React, { useEffect, useRef } from 'react';
import { useLocation, Location } from 'react-router-dom';

const ScrollToTop: React.FC = ({ children }) => {
  const location = useLocation();
  const oldLocation = useRef<Location>();
  const popstate = () => {
    console.log('popstate');
  };
  const pushstate = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    window.addEventListener('popstate', popstate);
    window.addEventListener('pushstate', pushstate);
    return () => {
      window.removeEventListener('popstate', popstate);
      window.removeEventListener('pushstate', pushstate);
    };
  }, []);
  useEffect(() => {
    if (oldLocation.current) {
      if (oldLocation.current.pathname !== location.pathname) {
        // console.log(123123);
      }
    }
    oldLocation.current = location;
  }, [location]);

  return <>{children}</>;
};

export default ScrollToTop;
