import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ isModalOpen }) => {
  if (!isModalOpen) return null;
  return (
    <div className="modal">
      <h3>Copy Or Download SVG</h3>
      <div className="code-container">
        <pre>
          <code>Code Goes Here</code>
        </pre>
        <div className="button-container">
          <button id="copy" type="button">
            Copy To Clipboard
          </button>
          <button id="download" type="button">
            Download SVG
          </button>
          <button id="close" type="button">
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
};

// const createExportModal = async () => {
//   const svgSelector = await init();
//   // svgSelector.setAttribute('preserveAspectRatio', 'none');
//   // 0 0 800 450

//   // const svgSelector = document.querySelector('svg');
//   const modal = document.createElement('div');
//   const H3 = document.createElement('h3');
//   const buttonContainer = document.createElement('div');
//   const buttonCopy = document.createElement('button');
//   buttonCopy.id = 'copy';
//   buttonCopy.textContent = `Copy To Clipboard`;
//   const buttonClose = document.createElement('button');
//   buttonClose.id = 'close';
//   buttonClose.textContent = `Close`;
//   const buttonDownload = document.createElement('button');
//   buttonDownload.id = 'download';
//   buttonDownload.textContent = 'Download';
//   const codeContainer = document.createElement('div');
//   const preTag = document.createElement('pre');
//   const code = document.createElement('code');
//   buttonContainer.style.cssText = `
//     padding-top: 2.5rem;
//     padding-bottom: 2.5rem;
//     justify-content: space-evenly;
//     display: flex;

//     `;
//   codeContainer.style.cssText = `
//     overflow: hidden;
//     background-color: rgb(23, 32, 38);
//     color: rgb(255, 255, 255);
//     border-radius: 0.5rem;
//     `;
//   H3.textContent = `Copy SVG`;
//   H3.style.cssText = `
//     font-size: 2.5rem;
//     text-align: center;
//     line-height: 1.15;`;
//   modal.style.cssText = `
//     position: fixed;
//     top: 50%;
//     left: 50%;
//     width: 50rem;
//     max-width: 90%;
//     z-index: 10;
//     background-color: white;
//     color: black;
//     transform: translate(-50%, -50%);
//     border-radius: 0.75rem;
//     padding: 1.25rem;`;
//   code.style.cssText = `
//     white-space: nowrap;
//     color: white;
//     font-family: "IBM Plex Mono", Menlo, mono;
//     font-size: 1rem;
//     line-height: 1.5;
//     display: block;
//     max-width: 100%;
//     overflow: scroll;
//     position: relative;
//     padding: 1.5rem 2.5rem 1.5rem 1.5rem;`;
//   document.body.appendChild(modal);
//   modal.appendChild(H3);
//   modal.appendChild(codeContainer);
//   modal.appendChild(buttonContainer);
//   buttonContainer.appendChild(buttonCopy);
//   buttonContainer.appendChild(buttonDownload);
//   buttonContainer.appendChild(buttonClose);
//   codeContainer.appendChild(preTag);
//   preTag.appendChild(code);
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
