import { useState, useEffect } from 'react';

const useRenderCount = (isModalOpen) => {
  const [openCount, setOpenCount] = useState(0);
  useEffect(() => {
    if (!isModalOpen) return;
    setOpenCount((prev) => prev + 1);
  }, [isModalOpen]);
  return openCount;
};

export default useRenderCount;
