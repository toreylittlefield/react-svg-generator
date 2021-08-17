import { useEffect, useState } from 'react';

const useSVGExport = (isModalOpen, guiData) => {
  const [svg, setSvg] = useState(undefined);
  useEffect(() => {
    const svgSelector = document.querySelector('svg');
    if (!svgSelector) return;
    const clone = svgSelector.cloneNode(true);
    clone.setAttribute('viewBox', '0 0 800 430');
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    setSvg(clone.outerHTML);
  }, [isModalOpen, guiData]);
  return svg;
};

export default useSVGExport;
