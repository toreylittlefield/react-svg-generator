import { useState, useEffect } from 'react';
import chroma from 'chroma-js';

const useGenerateSVG = (
  settings = {
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
  winH = Number,
  winW = Number
) => {
  const [svgCreated, setSvgCreated] = useState();
  useEffect(() => {
    let svg = document.getElementById('svg');
    let Colors = [];
    let Paths = [];
    let overflow;
    let startColor;
    let endColor;
    class Path {
      constructor(y, fill, offsetX) {
        this.rootY = y;
        this.fill = fill;
        this.offsetX = offsetX;
      }

      createRoot() {
        this.root = [];
        const { offsetX } = this;
        let x = -overflow + offsetX;
        let y = 0;
        const { rootY } = this;
        let upSideDown = 0;

        this.root.push({ x, y: rootY });

        while (x < winW) {
          let value = Math.random() > 0.5 ? 1 : -1;

          // Crazyness
          if (settings.crazyness) {
            x += parseInt(
              (Math.random() * settings.amplitudeX) / 2 +
                settings.amplitudeX / 2
            );
            y =
              parseInt(
                (Math.random() * settings.amplitudeY) / 2 +
                  settings.amplitudeY / 2
              ) *
                value +
              rootY;
          } else {
            // Geometric
            upSideDown = !upSideDown;
            value = upSideDown === 0 ? 1 : -1;

            x += settings.amplitudeX;
            y = settings.amplitudeY * value + rootY;
          }

          this.root.push({ x, y });
        }

        this.root.push({ x: winW + overflow, y: rootY });
      }

      createPath() {
        const { root } = this;
        const { fill } = this;
        const path = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'path'
        );
        path.setAttribute('fill', fill);
        path.setAttribute('stroke', fill);
        svg.appendChild(path);
        if (settings.fill) {
          svg.setAttribute('class', 'path');
        } else {
          svg.setAttribute('class', 'stroke');
        }

        // first & second points
        let d = `M -${overflow} ${winH + overflow}`;
        d += ` L ${root[0].x} ${root[0].y}`;

        // magic points
        for (let i = 1; i < this.root.length - 1; i += 1) {
          const prevPoint = root[i - 1];
          const actualPoint = root[i];
          const diffX = (actualPoint.x - prevPoint.x) / settings.smoothness;
          const x1 = prevPoint.x + diffX;
          const x2 = actualPoint.x - diffX;
          const { x } = actualPoint;
          const y1 = prevPoint.y;
          const y2 = actualPoint.y;
          const { y } = actualPoint;

          d += ` C ${x1} ${y1}, ${x2} ${y2}, ${x} ${y}`;
        }

        // Second last
        const reverseRoot = root.reverse();
        d += ` L ${reverseRoot[0].x} ${reverseRoot[0].y}`;
        root.reverse();

        // Last point
        d += ` L ${winW + overflow} ${winH + overflow}`;

        // Close path
        d += ` Z`;

        path.setAttribute('d', d);
      }
    }

    function init() {
      // Overflow
      overflow = Math.abs(settings.lines * settings.offsetX);

      // Colors
      startColor = `hsl(${settings.hueStartColor}, ${settings.saturationStartColor}%, ${settings.lightnessStartColor}%)`;
      endColor = `hsl(${settings.hueEndColor}, ${settings.saturationEndColor}%, ${settings.lightnessEndColor}%)`;
      Colors = chroma
        .scale([startColor, endColor])
        .mode('lch')
        .colors(settings.lines + 2);

      // Reset
      Paths = [];
      // eslint-disable-next-line no-unused-expressions
      //   try {
      //     document.body.removeChild(svg);
      //   } catch (error) {
      //     svg.remove();
      //   }
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('id', 'svg');
      document.body.appendChild(svg);

      // Background
      if (settings.fill) {
        const [firstColor] = Colors;
        svg.style.backgroundColor = firstColor;
      } else {
        svg.style.backgroundColor = '#000';
      }

      // Lines
      for (let i = 0; i < settings.lines + 1; i += 1) {
        const rootY = parseInt((winH / settings.lines) * i);
        const path = new Path(rootY, Colors[i + 1], settings.offsetX * i);
        Paths.push(path);
        path.createRoot();
      }
      Paths.forEach((path) => {
        path.createPath();
      });
      setSvgCreated(svg);
    }
    init();
  }, []);
  return svgCreated;
};

export default useGenerateSVG;
