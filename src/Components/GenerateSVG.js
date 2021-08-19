import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import PropTypes from 'prop-types';
import useGenerateSVG from 'Hooks/useGenerateSVG';
import useWindowSize from 'Hooks/useWindowSize';

const GenerateSVG = ({ guiData = {} }) => {
  const { winH, winW } = useWindowSize();
  const el = useRef();
  const tween = useRef();
  const q = gsap.utils.selector(el);
  const {
    className = '',
    backgroundColor = '',
    paths = [],
  } = useGenerateSVG(guiData, winH, winW);

  useEffect(() => {
    const pathElements = document.querySelectorAll('path');
    if (!pathElements.length) return;
    if (tween.current) {
      tween.current.pause();
      tween.current.seek(0);
      tween.current.kill();
    }
    if (!guiData.animate) {
      if (!tween.current) return;
      tween.current.pause();
      tween.current.seek(0);
      tween.current.kill();
      return;
    }
    tween.current = gsap.to(q(pathElements), {
      y: -200,
      x: 5,
      duration: 2,
      stagger: {
        each: 0.1,
        from: 'edges',
        grid: 'auto',
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      },
    });
    return () => {
      tween.current.pause();
      tween.current.seek(0);
      tween.current.kill();
    };
  }, [guiData.animate, paths]);
  return (
    <svg
      id="svg"
      xmlns="http://www.w3.org/2000/svg"
      style={{ backgroundColor }}
      className={className}
      ref={el}
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
    animate: PropTypes.bool.isRequired,
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
    animate: false,
  },
};
