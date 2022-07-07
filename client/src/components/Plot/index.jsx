import * as d3 from "d3";

export default function Plot(props) {
  const {
    data = [],
    x = ([x]) => x, // given d in data, returns the (temporal) x-value
    y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
    xString,
    yString,
    curve = d3.curveLinear, // method of interpolation between points
    rangeHeight = 16,
    marginTop = 20, // top margin, in pixels
    marginRight = 40, // right margin, in pixels
    marginBottom = 30, // bottom margin, in pixels
    marginLeft = 40, // left margin, in pixels
    width = 640, // outer width, in pixels
    height = 400, // outer height, in pixels
    xType = d3.scaleUtc, // the x-scale type
    yType = d3.scaleLinear, // the y-scale type
    yFormat, // a format specifier string for the y-axis
    yLabel, // a label for the y-axis
    color = "currentColor", // stroke color of line
    strokeLinecap = "round", // stroke line cap of the line
    strokeLinejoin = "round", // stroke line join of the line
    strokeWidth = 1.5, // stroke width of line, in pixels
    strokeOpacity = 1, // stroke opacity of line
  } = props;

  const X = data.map(x);
  const Y = data.map(y);
  const I = d3.range(X.length);

  return <svg>
  </svg>;
}
