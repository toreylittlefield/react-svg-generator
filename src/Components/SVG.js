import React, { useState } from 'react';
import DatGuiComponent from './DatGui';
import GenerateSVG from './GenerateSVG';

const initialSettings = {
  lines: 20,
  amplitudeX: 100,
  amplitudeY: 20,
  offsetX: 10,
  smoothness: 3,
  fill: true,
  crazyness: false,
  hueStartColor: 53,
  saturationStartColor: 74,
  lightnessStartColor: 67,
  hueEndColor: 216,
  saturationEndColor: 100,
  lightnessEndColor: 7,
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
