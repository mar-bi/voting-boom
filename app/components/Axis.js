import React from 'react'
import * as d3 from 'd3'

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
    return <g className="axis" ref="axis" transform={this.props.translate} />
  }
}
