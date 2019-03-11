/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { Tooltip } from 'reactstrap';

export default class MATooltip extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false,
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    });
  }

  render() {
    const { message, idTarget } = this.props;
    return (
        <Tooltip className="tooltip__message" placement="right" isOpen={this.state.tooltipOpen} target={idTarget} toggle={this.toggle}>
          {message}
        </Tooltip>
    );
  }
}
