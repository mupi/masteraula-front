import React from 'react';
import {
  ListGroup, ListGroupItem, Input,
  UncontrolledDropdown, DropdownToggle, DropdownMenu,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ListToggleLabels = ({
  labels, questionLabels, toggleApplyLabelToQuestion, idQuestion, isAddingRemovingLabel,
}) => {
  const handleFilter = (event) => {
    const idLabel = event.target.value;
    toggleApplyLabelToQuestion(idQuestion, idLabel, event.target.checked);
  };

  const isChecked = labelId => (questionLabels && questionLabels.filter(label => label.id === labelId).length > 0);
  return (
    <ListGroup className="c-filters__question-group-filters">
      <ListGroupItem className="label-item__title-toggle"> Etiquetas</ListGroupItem>
      {labels && labels.map(label => (
        <ListGroupItem
          key={label.id}
          color="light"
          className="label-item__toggle"
        >
          <Input
            type="checkbox"
            value={label.id}
            onClick={e => handleFilter(e)}
            checked={isChecked(label.id)}
            readOnly
            disabled={isAddingRemovingLabel}
          />
          {label.name}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

const ListLabels = ({
  labels, toggleApplyLabelToQuestion, question, isAddingRemovingLabel,
}) => (
  <UncontrolledDropdown>
    <DropdownToggle className="labels__btn-apply-label" title="Etiquetar como ...">
      <FontAwesomeIcon icon="tags" />
    </DropdownToggle>
    <DropdownMenu className="labels__menu">
      <ListToggleLabels
        labels={labels}
        toggleApplyLabelToQuestion={toggleApplyLabelToQuestion}
        questionLabels={question.labels}
        idQuestion={question.id}
        isAddingRemovingLabel={isAddingRemovingLabel}
      />
    </DropdownMenu>
  </UncontrolledDropdown>
);
export default ListLabels;
