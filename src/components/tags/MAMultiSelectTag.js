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
    // Initialize values
    const { input } = this.props;
    const tags = input.value === '' ? [] : input.value.split(',').map((tag, i) => ({ name: tag, id: i }));
    this.setState({ value: tags });
  }

  handleCreate(name) {
    const { input } = this.props;
    const { tags, value } = this.state;

    

    if (name !== '' && name.replace(',', '') !== '') {
      const newTag = {
        name: name.replace(',', ''),
        id: tags.length + 1,
      };
      
      this.setState({
        value: [...value, newTag], // select new option
      });

      value.push(newTag);

      const tagsSaved = value.map(t => (t.name)).join(',');
      input.onChange(tagsSaved);
    }
  }

  render() {
    const { value, tags } = this.state;
    const { placeholder, input } = this.props;

    return (
      <Multiselect
        data={tags}
        value={value}
        allowCreate="onFilter"
        onCreate={name => this.handleCreate(name)}
        onChange={(value) => { this.setState({ value }); input.onChange(value.map(t => (t.name)).join(',')); }}
        textField="name"
        placeholder={placeholder}
        showPlaceholderWithValues
      />
    );
  }
}


export default MAMultiSelectTag;
