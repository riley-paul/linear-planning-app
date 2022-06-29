import React, { useState } from "react";
import { useRect } from "../hooks/useRect";
import * as d3 from "d3";

export default function LineChart(props) {
  const data = props.data;
  const svgRef = React.useRef(null);
  const rect = useRect(svgRef)
  console.log(rect)

  // const ref = useRef(null)

  let {
    x = (d) => d.x, // given d in data, returns the (temporal) x-value
    y = (d) => d.y, // given d in data, returns the (quantitative) y-value
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
    marginTop = 20, // top margin, in pixels
    marginRight = 40, // right margin, in pixels
    marginBottom = 30, // bottom margin, in pixels
    marginLeft = 40, // left margin, in pixels
    width = 600, // outer width, in pixels
    height = 200, // outer height, in pixels
    xType = d3.scaleUtc, // the x-scale type
    xDomain, // [xmin, xmax]
    xRange = [marginLeft, width - marginRight], // [left, right]
    yType = d3.scaleLinear, // the y-scale type
    yDomain, // [ymin, ymax]
    yRange = [height - marginBottom, marginTop], // [bottom, top]
    yFormat, // a format specifier string for the y-axis
    yLabel, // a label for the y-axis
    color = "currentColor", // stroke color of line
    strokeLinecap = "round", // stroke line cap of the line
    strokeLinejoin = "round", // stroke line join of the line
    strokeWidth = 1.5, // stroke width of line, in pixels
    strokeOpacity = 1, // stroke opacity of line
  } = props.options;


  const drawChart = () => {
    // Compute values.
    const X = data.map(x);
    const Y = data.map(y);
    const I = d3.range(X.length);

    // Compute default domains.
    if (xDomain === undefined) xDomain = d3.extent(X);
    if (yDomain === undefined) yDomain = [0, d3.max(Y)];

    // Construct scales and axes.
    const xScale = xType(xDomain, xRange);
    const yScale = yType(yDomain, yRange);
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(width / 80)
      .tickSizeOuter(0);
    const yAxis1 = d3.axisLeft(yScale).ticks(height / 40, yFormat);
    const yAxis2 = d3.axisRight(yScale).ticks(height / 40, yFormat);

    // Construct a line generator.
    const line = d3
      .line()
      .curve(curve)
      .x((i) => xScale(X[i]))
      .y((i) => yScale(Y[i]));

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    // const rect.width = width || svgRef.current.getBoundingClientRect().width;
    // const rect.height = height || svgRef.current.getBoundingClientRect().height;

    svg
      .attr("width", rect.width)
      .attr("height", rect.height)
      .attr("viewBox", [0, 0, rect.width, rect.height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    // x-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${rect.height - marginBottom})`)
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

    // line
    svg
      .append("path")
      .attr("class", "line")
      .attr("d", line(I))
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", strokeWidth)
      .attr("stroke-linecap", strokeLinecap)
      .attr("stroke-linejoin", strokeLinejoin)
      .attr("stroke-opacity", strokeOpacity);

    // mouse hover

    const focus = svg
      .append("g")
      .append("circle")
      .style("fill", color)
      .attr("r", 4)
      .style("opacity", 0);

    // rectangle to record mouse events
    svg
      .append("rect")
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr("width", width)
      .attr("height", rect.height)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseout", mouseout);

    function mouseover() {
      focus.style("opacity", 1);
      focusText.style("opacity", 1);
    }

    const bisect = d3.bisector(x).left;

    function mousemove() {
      const x0 = xScale.invert(d3.pointer(this)[0]);
      const i = bisect(data, x0);
      const selectedData = data[i];
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
  };

  React.useEffect(drawChart, [data, rect]);

  return <svg ref={svgRef} width={rect.width} height={rect.height} />;
}
