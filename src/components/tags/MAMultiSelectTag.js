import React from 'react';
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/dist/css/react-widgets.css';

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

  handleCreate = (name) => {
    const { input } = this.props;
    const { value } = this.state;

    if (name !== '') {
      const newTag = {
        name,
        id: name,
      };

      this.setState({
        value: [...value, newTag], // select new option
      });

      value.push(newTag);

      const tagsSaved = value.map(t => (t.name)).join(',');
      input.onChange(tagsSaved);
    }
  }

  onChange = (value) => {
    const { input } = this.props;

    this.setState({ value });
    input.onChange(value.map(t => (t.name)).join(','));
  }

  render() {
    const { value, tags } = this.state;
    const { placeholder } = this.props;

    return (
      <Multiselect
        data={tags}
        value={value}
        allowCreate="onFilter"
        onCreate={this.handleCreate}
        onChange={this.onChange}
        textField="name"
        placeholder={placeholder}
        showPlaceholderWithValues
      />
    );
  }
}


export default MAMultiSelectTag;
