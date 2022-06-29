import React, { createRef, useEffect } from "react";
import * as d3 from "d3";
import classnames from "classnames";
import drawAxis from "./axis";
import drawTooltip from "./tooltip";

import "./index.scss";

const BaseChart = (drawChart, extraProps) => {
  function Chart(props) {
    const svgRef = React.createRef();
    const tooltipRef = React.createRef();
    const {
      axisProps,
      data,
      svgProps,
      tooltipClass,
      scaleBandPadding,
      ...restProps
    } = props;
    const { useScaleBands, findHoverData } = extraProps;

    const { margin, width, height, svgContainerClass } = svgProps;

    const yMinValue = d3.min(data, axisProps.y);
    const yMaxValue = d3.max(data, axisProps.y);

    const xMinValue = d3.min(data, axisProps.x);
    const xMaxValue = d3.max(data, axisProps.x);

    let xScale = d3
      .scaleLinear()
      .domain([xMinValue, xMaxValue])
      .range([0, width]);

    if (useScaleBands.x) {
      xScale = d3
        .scaleBand()
        .range([0, width])
        .domain(data.map(axisProps.x))
        .padding(scaleBandPadding);
    }

    let yScale = d3.scaleLinear().range([height, 0]).domain([0, yMaxValue]);

    if (useScaleBands.y) {
      yScale = d3
        .scaleBand()
        .range([height, 0])
        .domain(data.map(axisProps.y))
        .padding(scaleBandPadding);
    }

    useEffect(() => {
      flushChart();
      draw();
    });

    function flushChart() {
      d3.select(svgRef.current).selectAll("*").remove();
    }

    function draw() {
      const svg = d3
        .select(svgRef.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      drawAxis({
        ...axisProps,
        ...svgProps,
        ...extraProps,
        data,
        svgRef,
        xScale,
        yScale,
      });

      drawChart({
        svgRef,
        data,
        xScale,
        yScale,
        ...svgProps,
        ...restProps,
      });

      drawTooltip({
        useScaleBands,
        svgRef,
        tooltipRef,
        data,
        xScale,
        yScale,
        findHoverData,
        ...svgProps,
        ...restProps,
      });
    }

    return (
      <div className="base__container">
        <svg
          ref={svgRef}
          className={classnames("base__svg-container", svgContainerClass)}
        />
        <div
          className={classnames("base__tooltip", tooltipClass)}
          ref={tooltipRef}
        />
      </div>
    );
  }

  Chart.defaultProps = {
    scaleBandPadding: 0.05,
  };

  return Chart;
};
export default BaseChart;
