import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useSVGExport from '../Hooks/useSVGExport';

// eslint-disable-next-line react/prop-types
const Modal = ({ isModalOpen, setIsModalOpen, guiData }) => {
  const [openCount, setOpenCount] = useState(0);
  const handleCloseModal = () => setIsModalOpen((prev) => !prev);
  const handleClassName = isModalOpen ? 'modal open' : 'modal close';
  useEffect(() => {
    if (!isModalOpen) return;
    setOpenCount((prev) => prev + 1);
  }, [isModalOpen]);

  const {
    downloadSVG = () => {},
    copyToClipBoardSVG = () => {},
    code = '',
  } = useSVGExport(isModalOpen, guiData);
  return (
    <div className={openCount > 0 ? handleClassName : 'modal'}>
      <h3>Copy Or Download SVG</h3>
      <div className="code-container">
        <pre>
          <code>{code}</code>
        </pre>
        <div className="button-container">
          <button id="copy" type="button" onClick={copyToClipBoardSVG}>
            Copy To Clipboard
          </button>
          <button id="download" type="button" onClick={downloadSVG}>
            Download SVG
          </button>
          <button id="close" type="button" onClick={handleCloseModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};

// const createExportModal = async () => {
//   const svgSelector = await init();
//   // svgSelector.setAttribute('preserveAspectRatio', 'none');
//   // 0 0 800 450

//   // const svgSelector = document.querySelector('svg');
//   const clone = svgSelector.cloneNode(true);
//   clone.setAttribute('viewBox', '0 0 800 430');
//   clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
//   code.textContent = clone.outerHTML;
//   buttonClose.addEventListener('pointerdown', () => {
//     modal.remove();
//   });
//   buttonDownload.addEventListener('pointerdown', () => {
//     const blob = new Blob([clone.outerHTML], {
//       type: 'image/svg+xml;charset=utf-8',
//     });
//     const aTag = document.createElement('a');
//     aTag.download = 'generated-wave.svg';
//     aTag.href = window.URL.createObjectURL(blob);
//     aTag.click();
//     window.URL.revokeObjectURL(blob);
//     aTag.remove();
//   });
//   buttonCopy.addEventListener('pointerdown', () => {
//     navigator.clipboard.writeText(code.textContent).then(
//       function () {
//         /* clipboard successfully set */
//       },
//       function () {
//         /* clipboard write failed */
//       }
//     );
//   });
// };
// let guiExport = { export: () => createExportModal() };
