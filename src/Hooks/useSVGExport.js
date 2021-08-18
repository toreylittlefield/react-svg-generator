import { useEffect, useState } from 'react';

const useSVGExport = (isModalOpen, guiData) => {
  const [svg, setSvg] = useState({
    downloadSVG: () => {},
    copyToClipBoardSVG: () => {},
    code: '',
  });
  useEffect(() => {
    if (!isModalOpen) return svg;
    console.count('hook ran');
    const svgSelector = document.querySelector('svg');
    if (!svgSelector) return;
    const clone = svgSelector.cloneNode(true);
    // clone.setAttribute('viewBox', '0 0 800 430');
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    const code = clone.outerHTML;
    const blob = new Blob([clone.outerHTML], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const downloadSVG = () => {
      const aTag = document.createElement('a');
      aTag.download = 'generated-wave.svg';
      aTag.href = window.URL.createObjectURL(blob);
      aTag.click();
      window.URL.revokeObjectURL(blob);
      aTag.remove();
    };
    const copyToClipBoardSVG = () => {
      const { clipboard } = window.navigator;
      if (!clipboard) {
        const toastToRemove = document.querySelector('.toast-message');
        if (toastToRemove) toastToRemove.remove();
        const codeSelector = document.querySelector('code');
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'temp-input';
        input.value = codeSelector.innerText;
        document.body.appendChild(input);
        input.style.cssText = `opacity: 0; position: fixed;`;
        input.focus();
        input.select();
        const toastSection = document.createElement('div');
        toastSection.classList.add('toast-message', 'open');
        document.body.appendChild(toastSection);

        try {
          const successful = document.execCommand('copy');
          const msg = successful
            ? 'Copied To Clipboard'
            : 'Could Not Copy To Clipboard';
          toastSection.textContent = msg;
        } catch (err) {
          toastSection.textContent = `Was not possible to copy the text: ${err}`;
        }
        setTimeout(() => toastSection.remove(), 3000);
        input.remove();
      } else {
        clipboard.writeText(code).catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
        });
      }
      //   .then(
      // function () {
      //   /* clipboard successfully set */
      // },
      // function () {
      //   /* clipboard write failed */
      // }
      //   );
    };
    setSvg({ downloadSVG, copyToClipBoardSVG, code });
  }, [isModalOpen, guiData]);
  return svg;
};

export default useSVGExport;
