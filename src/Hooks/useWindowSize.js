import React from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = React.useState({
    winW: undefined,
    winH: undefined,
  });
  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        winW: window.innerWidth,
        winH: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    handleResize();
    // clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
};

export default useWindowSize;
