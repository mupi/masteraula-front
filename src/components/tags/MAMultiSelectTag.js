import React from 'react';
import Multiselect from 'react-widgets/lib/Multiselect';

class MAMultiSelectTag extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      value: [],
      tagsDropdown: [], // options available to select
    }
  }

  componentDidMount() {
    const { value } = this.props;
    const tags = value === '' ? [] : value.split(',').map((tag, i) => ({ name: tag, id: i }));
   
    this.setState({ value: tags });
  }

  handleCreate(name) {
    const { onChange } = this.props;
    let { value } = this.state;

    const newOption = {
      name,
      id: name,
    };

    this.setState({
      value: [...value, newOption],  // select new option
    });

    const tagsSaved = value.map(t => (t.name)).join(',');
    onChange(tagsSaved);
  }

  render() {
    const { value } = this.state;
    const { placeholder, onChange } = this.props;


    return (
      <Multiselect 
        value={value}
        allowCreate="onFilter"
        onCreate={name => this.handleCreate(name)}
        onChange={value => this.setState({ value })}
        textField="name"
        placeholder={placeholder}
      />
    )
  }
}


export default MAMultiSelectTag;
