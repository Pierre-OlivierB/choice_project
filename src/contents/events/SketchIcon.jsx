import { SKETCHES } from "./sketches";

// pathLength normalises every stroke, so they all draw at the same pace.
function SketchIcon({ type }) {
  const sketch = SKETCHES[type];

  if (!sketch) {
    return null;
  }

  return (
    <span className="sketch-wrapper" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="sketch-svg">
        <g transform={sketch.transform}>
          {sketch.lines.map((path) => (
            <path className="sketch-path" d={path} key={path} pathLength="1" />
          ))}
        </g>
        {sketch.fine?.map((path) => (
          <path
            className="sketch-path sketch-path--fine"
            d={path}
            key={path}
            pathLength="1"
          />
        ))}
        {sketch.dots?.map(([x, y, radius]) => (
          <circle className="sketch-dot" cx={x} cy={y} key={`${x}-${y}`} r={radius} />
        ))}
      </svg>
    </span>
  );
}

export default SketchIcon;
