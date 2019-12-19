import React from 'react';
import {
  ListGroup, ListGroupItem, Input,
  UncontrolledDropdown, DropdownToggle, DropdownMenu,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ListToggleLabels = ({
  labels, question, toggleApplyLabelToQuestion, isAddingRemovingLabel, relatedFrom,
}) => {
  const handleFilter = (event) => {
    const idLabel = event.target.value;
    toggleApplyLabelToQuestion(question.id, idLabel, event.target.checked, relatedFrom);
  };
  const isChecked = labelId => (question.labels && question.labels.filter(label => label.id === labelId).length > 0);

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

const ListLabels = props => (
  <UncontrolledDropdown>
    <DropdownToggle className="labels__btn-apply-label" title="Etiquetar como ...">
      <FontAwesomeIcon icon="tags" />
    </DropdownToggle>
    <DropdownMenu className="labels__menu">
      <ListToggleLabels {...props} />
    </DropdownMenu>
  </UncontrolledDropdown>
);
export default ListLabels;
