import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useSVGExport from '../Hooks/useSVGExport';
import useRenderCount from '../Hooks/useRenderCount';
import Toast from './Toast';

// eslint-disable-next-line react/prop-types
const Modal = ({ isModalOpen, setIsModalOpen, guiData }) => {
  const handleCloseModal = () => setIsModalOpen((prev) => !prev);
  const [msg, setMsg] = useState('');
  const handleClassName = isModalOpen ? 'modal open' : 'modal close';
  const openCount = useRenderCount(isModalOpen);
  const {
    downloadSVG = () => {},
    copyToClipBoardSVG = () => {},
    code = '',
  } = useSVGExport(isModalOpen, guiData);
  const handleCopyToClipboard = () => {
    const res = copyToClipBoardSVG();
    setMsg(res);
  };

  const handleDownload = () => {
    const res = downloadSVG();
    setMsg(res);
  };

  return (
    // eslint-disable-next-line react/jsx-fragments
    <React.Fragment>
      <div className={openCount > 0 ? handleClassName : 'modal'}>
        <h3>Copy Or Download SVG</h3>
        <div className="code-container">
          <pre>
            <code>{code}</code>
          </pre>
          <div className="button-container">
            <button id="copy" type="button" onClick={handleCopyToClipboard}>
              Copy To Clipboard
            </button>
            <button id="download" type="button" onClick={handleDownload}>
              Download SVG
            </button>
            <button id="close" type="button" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      </div>
      <Toast msg={msg} setMsg={setMsg} isModalOpen={isModalOpen} />
    </React.Fragment>
  );
};

export default Modal;

Modal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};
