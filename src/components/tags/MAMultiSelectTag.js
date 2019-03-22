import React from 'react';
import Multiselect from 'react-widgets/lib/Multiselect';

class MAMultiSelectTag extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      value: [],
      tags: [],
    };
  }

  handleCreate(name) {
    const { tags, value } = this.state;

    const newOption = {
      name,
      id: tags.length + 1,
    };

    this.setState({
      value: [...value, newOption], // select new option
      tags: [...tags, newOption], // add new option to our dataset
    });
  }

  render() {
    const { value, tags } = this.state;

    return (
      <Multiselect
        data={tags}
        value={value}
        allowCreate="onFilter"
        onCreate={name => this.handleCreate(name)}
        onChange={value => this.setState({ value })}
        textField="name"
      />
    );
  }
}


export default MAMultiSelectTag;
