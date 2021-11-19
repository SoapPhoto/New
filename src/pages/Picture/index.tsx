import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PictureContent from './components/PictureContent';

const PicturePage = () => {
  const { state, pathname, search } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (state?.backgroundLocation) {
      navigate(`${pathname}${search}`, { replace: true, state: null });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <PictureContent />;
};
export default PicturePage;
