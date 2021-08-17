import React, { useState } from 'react';
import DatGuiComponent from './DatGui';
import GenerateSVG from './GenerateSVG';

const initialSettings = {
  lines: 42,
  amplitudeX: 56,
  amplitudeY: 54,
  offsetX: 0,
  smoothness: 9.0,
  fill: false,
  crazyness: false,
  hueStartColor: 48,
  saturationStartColor: 74,
  lightnessStartColor: 67,
  hueEndColor: 203,
  saturationEndColor: 90,
  lightnessEndColor: 14,
};

const SVG = () => {
  const [guiData, setGuiData] = useState(initialSettings);
  return (
    <main>
      <DatGuiComponent guiData={guiData} setGuiData={setGuiData} />
      <GenerateSVG guiData={guiData} />
    </main>
  );
};

export default SVG;
