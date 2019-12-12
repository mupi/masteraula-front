import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button, DropdownToggle, DropdownItem, DropdownMenu, ButtonDropdown,
} from 'reactstrap';

class LabelItem extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { isOpen: false };
  }

  toggle() {
    const {
      isOpen,
    } = this.state;
    this.setState({ isOpen: !isOpen });
  }


  render() {
    const {
      label, showUpdateMyQuestionLabelModal, showDeleteMyQuestionLabelModal,
    } = this.props;

    const {
      isOpen,
    } = this.state;

    return (
      <ButtonDropdown isOpen={isOpen} toggle={this.toggle}>
        <Button color="link" className="label-item__name-link">
          <span>
            <FontAwesomeIcon icon="tag" style={{ color: label.color }} className="btn__icon" />
            {' '}
            {`${label.name} (${label.num_questions})`}
          </span>
        </Button>
        <DropdownToggle color="link" size="sm" caret className="label-item__name-link" />
        <DropdownMenu className="label-item__dropdown-menu">
          <DropdownItem onClick={() => showUpdateMyQuestionLabelModal(label)}>Editar</DropdownItem>
          <DropdownItem divider className="label-item__divider" />
          <DropdownItem onClick={() => showDeleteMyQuestionLabelModal(label.id, label.name)}>Apagar</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

export default LabelItem;
