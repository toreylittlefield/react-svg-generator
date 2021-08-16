import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useGenerateSVG from '../Hooks/useGenerateSVG';
import useWindowSize from '../Hooks/useWindowSize';

const GenerateSVG = ({ guiData = {} }) => {
  const { winH, winW } = useWindowSize();
  useEffect(() => {}, [guiData]);
  useGenerateSVG({ ...guiData }, winH, winW);
  return <svg id="svg" />;
};

export default GenerateSVG;

GenerateSVG.propTypes = {
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
  }),
};

GenerateSVG.defaultProps = {
  guiData: {
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
  },
};
