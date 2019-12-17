import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button, ButtonDropdown,
} from 'reactstrap';

class QuestionLabelItem extends Component {
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
      label, addSelectedMyQuestionLabelFilter, removeSelectedLabelFromQuestion, idQuestion,
    } = this.props;

    const {
      isOpen,
    } = this.state;

    const styleLabelButton = {
      background: label.color || '#d3cfcf',
      color: label.color === '#FFFF33' || label.color === '#9AEE2E' ? '#000' : '#FFF',
    };

    return (
      <ButtonDropdown isOpen={isOpen} toggle={this.toggle} className="c-question__label-item-btn">
        <Button color="link" className="c-question__label-item-name" style={styleLabelButton} onClick={() => addSelectedMyQuestionLabelFilter(label)}>
          <span>
            {label.name}
          </span>
        </Button>
        <Button
          style={styleLabelButton}
          className="c-question__label-item-btn-remove"
          onClick={() => removeSelectedLabelFromQuestion(idQuestion, label.id)}
          title={`Remover a etiqueta ${label.name} da questão`}
        >
          <FontAwesomeIcon
            className="c-question__label-item-icon-remove"
            icon="times"
          />
        </Button>
      </ButtonDropdown>
    );
  }
}

export default QuestionLabelItem;
