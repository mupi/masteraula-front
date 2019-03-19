import React, { Component } from 'react';
import {
  ListGroup, ListGroupItem, Input, Button, Collapse,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SidebarFilter extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: true };
  }

  toggle() {
    const {
      collapse,
    } = this.state;
    this.setState({ collapse: !collapse });
  }


  render() {
    const {
      name, filterList, toggleFilter, selected,
    } = this.props;

    const {
      collapse,
    } = this.state;

    const handleFilter = (event) => {
      const valueFilter = event.target.value;
      toggleFilter(valueFilter, event.target.checked);
    };

    const isChecked = filterId => (selected && selected.filter(item => item.id === filterId).length > 0);
    return (
      <ListGroupItem className="c-filters">
        <div className="c-filters__question-category-filter" onClick={this.toggle}>
          {name}
          <Button className="c-filters__question-category-filter-icon" color="light">
            {collapse ? <FontAwesomeIcon icon="angle-down" /> : <FontAwesomeIcon icon="angle-left" />}
          </Button>
        </div>
        <Collapse isOpen={collapse}>
          <ListGroup className="c-filters__question-group-filters">
            {filterList && filterList.map(filter => (
              <ListGroupItem
                key={filter.id}
                color="light"
                className={isChecked(filter.id) ? 'c-filters__question-single-filter c-sidebar__filter-selected' : 'c-filters__question-single-filter'}
              >
                <Input type="checkbox" value={filter.id} onClick={handleFilter} checked={isChecked(filter.id)} readOnly />
                {filter.name}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Collapse>
      </ListGroupItem>
    );
  }
}

export default SidebarFilter;
