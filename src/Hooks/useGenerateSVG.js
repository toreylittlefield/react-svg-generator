import { useState, useEffect } from 'react';
import chroma from 'chroma-js';

const useGenerateSVG = (
  guiData = {},
  winH = window.innerHeight,
  winW = window.innerWidth
) => {
  const [svgCreated, setSvgCreated] = useState({
    className: '',
    paths: [],
    backgroundColor: '',
  });
  useEffect(() => {
    if (!guiData.lines) return;
    let Colors = [];
    let overflow;
    const paths = { className: 'fill', backgroundColor: '', paths: [] };
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
        let upSideDown = false;

        this.root.push({ x, y: rootY });

        while (x < winW) {
          let value = Math.random() > 0.5 ? 1 : -1;

          // Crazyness
          if (guiData.crazyness) {
            x += parseInt(
              (Math.random() * guiData.amplitudeX) / 2 + guiData.amplitudeX / 2
            );
            y =
              parseInt(
                (Math.random() * guiData.amplitudeY) / 2 +
                  guiData.amplitudeY / 2
              ) *
                value +
              rootY;
          } else {
            // Geometric
            upSideDown = !upSideDown;
            value = upSideDown ? 1 : -1;
            x += guiData.amplitudeX;
            y = guiData.amplitudeY * value + rootY;
          }

          this.root.push({ x, y });
        }

        this.root.push({ x: winW + overflow, y: rootY });
      }

      createPath() {
        const { root } = this;
        const { fill } = this;
        const path = {};
        if (guiData.fill) {
          path.fill = fill;
        } else {
          path.fill = 'none';
        }
        path.stroke = fill;

        // first & second points
        let d = `M -${overflow} ${winH + overflow}`;
        d += ` L ${root[0].x} ${root[0].y}`;

        // magic points
        for (let i = 1; i < this.root.length - 1; i += 1) {
          const prevPoint = root[i - 1];
          const actualPoint = root[i];
          const diffX = (actualPoint.x - prevPoint.x) / guiData.smoothness;
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
        path.d = d;
        return path;
      }
    }
    const initColors = () => {
      // Colors
      const startColor = `hsl(${guiData.hueStartColor}, ${guiData.saturationStartColor}%, ${guiData.lightnessStartColor}%)`;
      const endColor = `hsl(${guiData.hueEndColor}, ${guiData.saturationEndColor}%, ${guiData.lightnessEndColor}%)`;
      Colors = chroma
        .scale([startColor, endColor])
        .mode('lch')
        .colors(guiData.lines + 2);
      // Background
      if (guiData.fill) {
        const [firstColor] = Colors;
        paths.className = 'fill';
        paths.backgroundColor = firstColor;
      } else {
        paths.backgroundColor = '#000';
        paths.className = 'stroke';
      }
    };
    const createRootsInPaths = () => {
      const Paths = [];
      for (let i = 0; i < guiData.lines; i += 1) {
        const rootY = parseInt((winH / guiData.lines) * i);
        const path = new Path(rootY, Colors[i + 1], guiData.offsetX * i);
        Paths.push(path);
        path.createRoot();
      }
      return Paths;
    };
    const initSVG = () => {
      // Colors
      initColors();
      // Overflow
      overflow = Math.abs(guiData.lines * guiData.offsetX);

      // roots
      const Roots = createRootsInPaths();
      // paths
      Roots.forEach((root) => {
        const path = root.createPath();
        paths.paths.push(path);
      });
      return paths;
    };
    const results = initSVG();
    setSvgCreated(results);
  }, [winH, winW, guiData]);
  return svgCreated;
};

export default useGenerateSVG;
