import React from 'react';
import PropTypes from 'prop-types';
import useGenerateSVG from '../Hooks/useGenerateSVG';
import useWindowSize from '../Hooks/useWindowSize';

const GenerateSVG = ({ guiData = {} }) => {
  const { winH, winW } = useWindowSize();
  const {
    className = '',
    backgroundColor = '',
    paths = [],
  } = useGenerateSVG(guiData, winH, winW);
  return (
    <svg
      id="svg"
      xmlns="http://www.w3.org/2000/svg"
      style={{ backgroundColor }}
      className={className}
    >
      {paths?.map((path, index) => (
        <path
          // eslint-disable-next-line react/no-array-index-key
          key={`path-${index}`}
          stroke={path.stroke}
          fill={path.fill}
          d={path.d}
        />
      ))}
    </svg>
  );
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
  },
};
