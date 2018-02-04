import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

import Axis from './Axis'

const renderRect = props => {
  return (elem, index) => {
    const rectProps = {
      fill: '#00BCD4',
      width: props.xScale.bandwidth(),
      height: props.yScale(elem) || 0,
      x: props.xScale(index),
      y: props.height - props.yScale(elem) || 0,
      key: index
    }
    return <rect {...rectProps} />
  }
}

renderRect.propTypes ={
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired
}

const DataRect = props => (
  <g transform={`translate(${props.style.padding / 2},0)`}>
    {props.data.map(renderRect(props))}
  </g>
)

DataRect.propTypes = {
  style: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired
}

const XYAxis = props => {
  const xSettings = {
    translate: `translate(${props.style.padding / 2}, ${props.height +
      props.style.padding / 4})`,
    scale: props.xAxisScale,
    orient: 'bottom',
    ticks: props.maxX
  }
  const ySettings = {
    translate: `translate(${props.style.padding * 1.3}, 0)`,
    scale: props.yAxisScale,
    orient: 'left'
  }
  return (
    <g className="xy-axis">
      <Axis {...xSettings} />
      <Axis {...ySettings} />
    </g>
  )
}

XYAxis.propTypes = {
  style: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  xAxisScale: PropTypes.func.isRequired,
  yAxisScale: PropTypes.func.isRequired,
  maxX: PropTypes.number.isRequired
}

const BarChart = props => {
  const height = props.style.height - props.style.padding * 4,
    width = props.style.width - props.style.padding * 2

  const data = [...props.data]
  const xVals = data.map(e => e.option)
  const sumY = d3.sum(data, d => d.num)
  const normalizedY = data.map(e => (e.num / sumY).toFixed(2) * 100)

  const yScale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([0, height - props.style.padding])

  const xScale = d3
    .scaleBand()
    .domain(d3.range(0, data.length))
    .range([props.style.padding, width + props.style.padding])
    .paddingInner(0.02)

  const yAxisScale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([height, props.style.padding])

  const xAxisScale = d3
    .scaleBand()
    .domain(xVals)
    .range([props.style.padding, width + props.style.padding])
    .paddingInner(0.02)

  const sizes = { width, height }
  const scales = { xScale, yScale }
  const axisScales = { xAxisScale, yAxisScale }

  return (
    <svg width={props.style.width} height={props.style.height}>
      <text x="15" y="15">
        %
      </text>
      <DataRect {...scales} {...sizes} data={normalizedY} style={props.style} />
      <XYAxis {...props} {...sizes} {...axisScales} maxX={data.length} />
    </svg>
  )
}

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
  style: PropTypes.object.isRequired
}

export default BarChart
