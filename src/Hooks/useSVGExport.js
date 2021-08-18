import { useEffect, useState } from 'react';
import { downloadSVG, copyToClipBoardSVG } from '../Utils/Utils';

const useSVGExport = (isModalOpen, guiData) => {
  const [svgExportOptions, setSvgExportOptions] = useState({
    downloadSVG: () => {},
    copyToClipBoardSVG: () => {},
    code: '',
  });
  useEffect(() => {
    const svgSelector = document.querySelector('#svg');
    if (!svgSelector) return;
    const code = svgSelector.outerHTML;
    setSvgExportOptions({ downloadSVG, copyToClipBoardSVG, code });
  }, [isModalOpen, guiData]);
  return svgExportOptions;
};

export default useSVGExport;
