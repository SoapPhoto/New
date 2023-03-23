import React, { PropsWithChildren, useEffect, useRef } from 'react';
import {
  useLocation, Location, useNavigationType,
} from 'react-router-dom';

const ScrollToTop: React.FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const oldLocation = useRef<Location>();
  const navigationType = useNavigationType();
  useEffect(() => {
    if (oldLocation.current) {
      if (oldLocation.current.pathname !== location.pathname && navigationType !== 'POP' && !(location.state as any)?.backgroundLocation) {
        window.scrollTo(0, 0);
      }
    }
    oldLocation.current = location;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return children;
};

export default ScrollToTop;
