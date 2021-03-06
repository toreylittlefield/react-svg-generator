const clipboardFallBack = (code = '') => {
  try {
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'temp-input';
    input.value = code;
    document.body.appendChild(input);
    input.style.cssText = `opacity: 0; position: fixed;`;
    input.focus();
    input.select();
    const successful = document.execCommand('copy');
    const msg = successful
      ? 'Copied To Clipboard'
      : 'Could Not Copy To Clipboard';
    input.remove();
    // toastMessage(msg);
    return msg;
  } catch (err) {
    // toastMessage(`Was not possible to copy the text: ${err}`);
    return `Was not possible to copy the text: ${err}`;
  }
};

export const copyToClipBoardSVG = () => {
  const codeSelector = document.querySelector('code');
  const code = codeSelector.textContent;
  const { clipboard } = window.navigator;
  if (!clipboard) return clipboardFallBack(code);
  if (clipboard) {
    let msg = '';
    clipboard
      .writeText(code)
      .then((msg = 'Copied To Clipboard'))
      // toastMessage(msg);
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
    return msg;
  }
};

export const downloadSVG = () => {
  const svg = document.querySelector('#svg');
  if (!svg) {
    // return toastMessage('Cannot download. Not SVG Found');
    return 'Cannot download. Not SVG Found';
  }
  const blob = new Blob([svg.outerHTML], {
    type: 'image/svg+xml;charset=utf-8',
  });
  const aTag = document.createElement('a');
  aTag.download = 'generated-wave.svg';
  aTag.href = window.URL.createObjectURL(blob);
  aTag.click();
  window.URL.revokeObjectURL(blob);
  aTag.remove();
  // toastMessage('Downloading');
  return 'Downloading';
};
