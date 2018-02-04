import React from 'react'
import * as d3 from 'd3'
import PropTypes from 'prop-types'

export default class Axis extends React.Component {
  componentDidMount() {
    this.renderAxis()
  }

  componentDidUpdate() {
    this.renderAxis()
  }

  renderAxis() {
    const node = this.refs.axis
    const axis =
      this.props.orient === 'bottom'
        ? d3.axisBottom(this.props.scale).ticks(this.props.ticks)
        : d3.axisLeft(this.props.scale).ticks(5)

    d3.select(node).call(axis)
  }

  render() {
    const axisClass =
      this.props.orient === 'bottom'
        ? 'axis x-axis'
        : 'axis y-axis'
    return <g className={axisClass} ref="axis" transform={this.props.translate} />
  }
}

Axis.propTypes = {
  orient: PropTypes.string.isRequired,
  scale: PropTypes.func.isRequired,
  ticks: PropTypes.number,
  translate: PropTypes.string.isRequired,
}
