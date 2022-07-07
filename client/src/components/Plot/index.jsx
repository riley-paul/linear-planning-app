import * as d3 from "d3";
import Axis from "./Axis";

export default function Plot(props) {
  const {
    data = { elevation: [], ranges: [] },
    x = ([x]) => x, // given d in data, returns the (temporal) x-value
    y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
    xString,
    yString,
    curve = d3.curveLinear, // method of interpolation between points
    rangeHeight = 16,
    margin = { top: 20, right: 40, left: 40, bottom: 30 },
    marginTop = 20, // top margin, in pixels
    marginRight = 40, // right margin, in pixels
    marginBottom = 30, // bottom margin, in pixels
    marginLeft = 40, // left margin, in pixels
    width = 600, // outer width, in pixels
    height = 200, // outer height, in pixels
    xType = d3.scaleLinear, // the x-scale type
    yType = d3.scaleLinear, // the y-scale type
    yFormat, // a format specifier string for the y-axis
    yLabel, // a label for the y-axis
    color = "currentColor", // stroke color of line
    strokeLinecap = "round", // stroke line cap of the line
    strokeLinejoin = "round", // stroke line join of the line
    strokeWidth = 1.5, // stroke width of line, in pixels
    strokeOpacity = 1, // stroke opacity of line
  } = props;

  const X = data.elevation.map(x);
  const Y = data.elevation.map(y);
  const I = d3.range(X.length);

  const xRange = [margin.left, width - margin.right];
  const yRange = [height - margin.bottom, margin.top];

  const xDomain = d3.extent(X);
  const yDomain = [0, d3.max(Y)];

  const xScale = xType(xDomain, xRange);
  const yScale = yType(yDomain, yRange);

  return (
    <svg
      width={width}
      height={height}
      viewBox={[0, 0, width, height].join(",")}
      style={{ maxWidth: "100%", height: "auto intrinsic" }}
    >
      <Axis
        domain={xDomain}
        range={xRange}
        options={{
          side: "bottom",
          transform: `translate(0,${height - margin.bottom})`,
          pixelsPerTick: 80,
        }}
      ></Axis>
      <Axis
        domain={yDomain}
        range={yRange}
        options={{
          side: "left",
          transform: `translate(${margin.left},0)`,
        }}
      ></Axis>
      <Axis
        domain={yDomain}
        range={yRange}
        options={{
          side: "right",
          transform: `translate(${width - margin.right},0)`,
        }}
      ></Axis>
    </svg>
  );
}

function lineChart(
  { elevation = [], ranges = [] } = {},
  {
    x = ([x]) => x, // given d in data, returns the (temporal) x-value
    y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
    xString = (i) =>
      i.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }),
    yString = (i) =>
      i.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }),
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
  } = {}
) {
  // Compute values.
  const X = elevation.map(x);
  const Y = elevation.map(y);
  const I = d3.range(X.length);

  const rangesHeight = rangeHeight * ranges.length;
  const xRange = [marginLeft, width - marginRight];
  const yRange = [height - marginBottom - rangesHeight, marginTop];

  const innerHeight = height - marginTop - marginBottom;
  const innerWidth = width - marginLeft - marginRight;

  // Compute default domains.
  const xDomain = d3.extent(X);
  const yDomain = [0, d3.max(Y)];

  // Construct scales and axes.
  const xScale = xType(xDomain, xRange);
  const yScale = yType(yDomain, yRange);
  const xAxis = d3
    .axisBottom(xScale)
    .ticks(width / 80)
    .tickSizeOuter(0)
    .tickFormat(xString);
  const yAxis1 = d3
    .axisLeft(yScale)
    .ticks(height / 40, yFormat)
    .tickFormat(yString);
  const yAxis2 = d3
    .axisRight(yScale)
    .ticks(height / 40, yFormat)
    .tickFormat(yString);

  // Construct a line generator.
  const drawLine = d3
    .line()
    .curve(curve)
    .x((i) => xScale(X[i]))
    .y((i) => yScale(Y[i]));

  function drawRanges() {
    plotArea.select("#range-group").remove();
    const rangeArea = plotArea.append("g").attr("id", "range-group");

    for (const [index, range] of ranges.entries()) {
      const rangeGroup = rangeArea
        .append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "middle");
      const topY = height - marginBottom - rangeHeight * (index + 1);
      const midY = topY + rangeHeight / 2;
      rangeGroup
        .selectAll("rect")
        .data(range.data)
        .join("rect")
        .attr("x", (d) => xScale(d.KP_beg))
        .attr("y", topY)
        .attr("height", rangeHeight)
        .attr("width", (d) => Math.abs(xScale(d.KP_end) - xScale(d.KP_beg)))
        .style("fill", (d) => `rgb(${JSON.parse(d.colour)})`);

      rangeGroup
        .selectAll("text")
        .data(range.data)
        .join("text")
        .text((d) => {
          const width = Math.abs(xScale(d.KP_end) - xScale(d.KP_beg));
          return width > 50 ? d.text_shrt : "";
        })
        .attr("x", (d) => (xScale(d.KP_beg) + xScale(d.KP_end)) / 2)
        .attr("y", midY)
        .attr("dy", "5px")
        .attr("fill", "white");
    }

    // add dividers
    for (let i = 0; i < ranges.length; i++) {
      const topY = height - marginBottom - rangeHeight * (i + 1);
      rangeArea
        .append("line")
        .attr("class", "divider")
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("x1", marginLeft)
        .attr("x2", width - marginRight)
        .attr("y1", topY)
        .attr("y2", topY)
        .attr("z-index", 10);
    }
  }

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  const clip = svg
    .append("defs")
    .append("svg:clipPath")
    .attr("id", "clip")
    .append("svg:rect")
    .attr("x", marginLeft)
    .attr("y", marginTop)
    .attr("width", innerWidth)
    .attr("height", innerHeight);

  const plotArea = svg.append("g").attr("clip-path", "url(#clip)");

  drawRanges();

  // Add x-axis
  const xAxisSvg = svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(xAxis);

  // left y-axis, y-label and grid-lines
  svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(yAxis1)
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .selectAll(".tick line")
        .clone()
        .attr("x2", width - marginLeft - marginRight)
        .attr("stroke-opacity", 0.1)
    )
    .call((g) =>
      g
        .append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text(yLabel)
    );

  // right y-axis
  const rightAxis = svg
    .append("g")
    .attr("transform", `translate(${width - marginRight},0)`)
    .call(yAxis2)
    .call((g) => g.select(".domain").remove());

  const brush = d3
    .brushX()
    .extent([
      [marginLeft, marginTop],
      [width - marginRight, height - marginBottom],
    ])
    .on("end", updateDomain);

  const focusText = rightAxis
    .append("text")
    .style("opacity", 0)
    .attr("text-anchor", "end")
    .attr("alignment-baseline", "middle")
    .attr("x", marginRight)
    .attr("y", 10)
    .attr("fill", "currentColor");

  const focusTextX = focusText
    .append("tspan")
    .attr("x", 10)
    .attr("style", "font-weight: bold;");
  const focusTextY = focusText
    .append("tspan")
    .attr("dy", "1.2em")
    .attr("x", 10);

  // add line
  plotArea
    .append("path")
    .attr("class", "line")
    .attr("d", drawLine(I))
    .attr("fill", "none")
    .attr("stroke", color)
    .attr("stroke-width", strokeWidth)
    .attr("stroke-linecap", strokeLinecap)
    .attr("stroke-linejoin", strokeLinejoin)
    .attr("stroke-opacity", strokeOpacity);

  // mouse hover
  const focus = plotArea
    .append("g")
    .append("circle")
    .style("fill", color)
    .attr("r", 4)
    .style("opacity", 0);

  // rectangle to record mouse events
  plotArea
    .append("rect")
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr("width", width)
    .attr("height", height)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseout", mouseout);

  plotArea.append("g").attr("class", "brush").call(brush);

  function mouseover() {
    focus.style("opacity", 1);
    focusText.style("opacity", 1);
  }

  const bisect = d3.bisector(x).left;

  function mousemove(e) {
    const x0 = xScale.invert(d3.pointer(e)[0]);
    const i = bisect(elevation, x0);
    const selectedData = elevation[i];
    if (!selectedData) return;
    focus
      .attr("cx", xScale(x(selectedData)))
      .attr("cy", yScale(y(selectedData)));
    focusTextX.text(xString(x(selectedData)));
    focusTextY.text(yString(y(selectedData)));
  }

  function mouseout() {
    focus.style("opacity", 0);
    focusText.style("opacity", 0);
  }

  let idleTimeout;
  const idled = () => (idleTimeout = null);

  function updateDomain(event, d) {
    const extent = event.selection;

    // if no selection, return to initial coordinate. Otherwise update x domain
    if (!extent) {
      if (!idleTimeout) return (idleTimeout = setTimeout(idled, 350));
      xScale.domain(xDomain); // set domain to full extent
    } else {
      xScale.domain([xScale.invert(extent[0]), xScale.invert(extent[1])]); // set domain to to brush extent
      plotArea.select(".brush").call(brush.move, null); // remove brush area as soon as selection complete
    }

    xAxisSvg.call(d3.axisBottom(xScale));
    plotArea.select(".line").attr("d", drawLine(I));
    drawRanges();
  }

  return svg.node();
}
