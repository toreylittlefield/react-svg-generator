import PropTypes from 'prop-types';
import DatGui, {
  DatBoolean,
  DatFolder,
  DatNumber,
  DatButton,
} from 'react-dat-gui';
import 'react-dat-gui/dist/index.css';

const DatGuiComponent = ({ guiData, setGuiData, setIsModalOpen }) => {
  const handleRandomize = () => {
    setGuiData({
      lines: parseInt(2 + Math.random() * 48),
      amplitudeX: parseInt(20 + Math.random() * 300),
      amplitudeY: parseInt(Math.random() * 200),
      hueStartColor: parseInt(Math.random() * 360),
      saturationStartColor: 74,
      lightnessStartColor: 67,
      hueEndColor: parseInt(Math.random() * 360),
      saturationEndColor: 90,
      lightnessEndColor: 14,
      smoothness: 1 + parseInt(Math.random() * 9),
      offsetX: parseInt(-20 + Math.random() * 40),
      fill: Math.random() * 1 > 0.3,
      crazyness: Math.random() * 1 > 0.9,
      animate: guiData.animate,
    });
  };

  const handleExport = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <nav className="dat-gui">
      <DatGui data={guiData} onUpdate={setGuiData}>
        <DatFolder title="Settings">
          <DatNumber path="lines" label="Lines" min={2} max={50} step={1} />
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
        <DatBoolean path="animate" label="Animate" />
        <DatButton label="Randomize" onClick={handleRandomize} />
        <DatButton label="Export SVG" onClick={handleExport} />
      </DatGui>
    </nav>
  );
};

export default DatGuiComponent;

DatGuiComponent.propTypes = {
  guiData: PropTypes.shape({
    lines: PropTypes.number.isRequired,
    amplitudeX: PropTypes.number.isRequired,
    amplitudeY: PropTypes.number.isRequired,
    offsetX: PropTypes.number.isRequired,
    smoothness: PropTypes.number.isRequired,
    fill: PropTypes.bool.isRequired,
    crazyness: PropTypes.bool.isRequired,
    hueStartColor: PropTypes.number.isRequired,
    saturationStartColor: PropTypes.number.isRequired,
    lightnessStartColor: PropTypes.number.isRequired,
    hueEndColor: PropTypes.number.isRequired,
    saturationEndColor: PropTypes.number.isRequired,
    lightnessEndColor: PropTypes.number.isRequired,
    animate: PropTypes.bool.isRequired,
  }),
  setGuiData: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};

DatGuiComponent.defaultProps = {
  guiData: {
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
    animate: false,
  },
};
