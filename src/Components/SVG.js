import React, { useState } from 'react';
import DatGuiComponent from './DatGui';

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
  return <DatGuiComponent guiData={guiData} setGuiData={setGuiData} />;
};

export default SVG;
