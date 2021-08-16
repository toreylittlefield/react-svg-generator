import { useState } from 'react';
import DatGui, {
  DatBoolean,
  DatFolder,
  DatNumber,
  DatButton,
} from 'react-dat-gui';
import 'react-dat-gui/dist/index.css';

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

const DatGuiComponent = () => {
  const [guiData, setGuiData] = useState(initialSettings);

  return (
    <div>
      <DatGui data={guiData} onUpdate={setGuiData}>
        <DatFolder title="Settings">
          <DatNumber path="lines" label="Lines" min={5} max={50} step={1} />
          <DatNumber
            path="amplitudeX"
            label="AmplitudeX"
            min={20}
            max={300}
            step={1}
          />
          <DatNumber
            path="amplitudeY"
            label="AmplitudeY"
            min={0}
            max={200}
            step={1}
          />
          <DatNumber
            path="offsetX"
            label="OffsetX"
            min={-20}
            max={20}
            step={1}
          />
          <DatNumber
            path="smoothness"
            label="Smoothness"
            min={0.5}
            max={10}
            step={0.2}
          />
          <DatBoolean path="fill" label="Fill" />
          <DatBoolean path="crazyness" label="Crazyness" />
        </DatFolder>
        <DatFolder title="Start Color">
          <DatNumber
            path="hueStartColor"
            label="Hue Start Color"
            min={0}
            max={360}
            step={1}
          />
          <DatNumber
            path="saturationStartColor"
            label="Saturation Start Color"
            min={0}
            max={100}
            step={1}
          />
          <DatNumber
            path="lightnessStartColor"
            label="Lightness Start Color"
            min={0}
            max={100}
            step={1}
          />
        </DatFolder>
        <DatFolder title="End Color">
          <DatNumber
            path="hueEndColor"
            label="Hue End Color"
            min={0}
            max={360}
            step={1}
          />
          <DatNumber
            path="saturationEndColor"
            label="Saturation End Color"
            min={0}
            max={100}
            step={1}
          />
          <DatNumber
            path="lightnessEndColor"
            label="Lightness End Color"
            min={0}
            max={100}
            step={1}
          />
        </DatFolder>
        <DatButton label="Randomize" />
        <DatButton label="Export SVG" />
      </DatGui>
    </div>
  );
};

export default DatGuiComponent;
