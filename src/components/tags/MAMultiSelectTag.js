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

  componentDidMount() {
    const { value } = this.props;
    console.log(value);
    const tags = value === '' ? [] : value.split(',').map((i, tag) => ({ name: tag, id: i }));
   
    this.setState({ value:value.split(',') });
  }

  handleCreate(name) {
    const { tags, value } = this.state;
    const { onChange } = this.props;

    const newOption = {
      name,
      id: tags.length + 1,
    };

    this.setState({
      value: [...value, newOption], // select new option
      tags: [...tags, newOption], // add new option to our dataset
    });

    const tagsSaved = value.map(t => (t.name)).join(',');
    onChange(tagsSaved);

  }

  render() {
    const { value, tags } = this.state;
    const { placeholder } = this.props;

    return (
      <Multiselect
        data={tags}
        value={value}
        allowCreate="onFilter"
        onCreate={name => this.handleCreate(name)}
        onChange={value => this.setState({ value })}
        textField="name"
        placeholder={placeholder}
      />
    );
  }
}


export default MAMultiSelectTag;
