import React, { Component } from 'react';
import {
  ListGroupItem, Button, Collapse,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SidebarMenu extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    const {
      collapse,
    } = this.state;
    this.setState({ collapse: !collapse });
  }


  render() {
    const {
      name, children, iconMenu,
    } = this.props;

    const {
      collapse,
    } = this.state;

    return (
      <>
        <div
          role="button"
          tabIndex="0"
          onClick={this.toggle}
          onKeyDown={this.toggle}
          className="d-flex justify-content-between menu__option-sidebar align-items-center"
        >
          <span>
            <FontAwesomeIcon
              className="btn__icon"
              icon={iconMenu}
            />
            {name}
          </span>
          <Button className="menu__option-sidebar-btn-collapse">
            {collapse ? <FontAwesomeIcon icon="angle-down" /> : <FontAwesomeIcon icon="angle-left" />}
          </Button>
        </div>
        <Collapse isOpen={collapse}>
          {children}
        </Collapse>
      </>
    );
  }
}

export default SidebarMenu;
