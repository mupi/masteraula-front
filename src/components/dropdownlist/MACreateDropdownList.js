import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';


class MACreateDropdownList extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      value: null,
      options: [],
    };
  }

  componentDidMount() {
    // Initialize values
    const { listOptions } = this.props;
    const options = listOptions.map((option, i) => ({ name: option.name, id: option.id }));
    this.setState({ options });
  }


  // Create a new option
  handleCreate(name) {
    const { input } = this.props;
    const { options } = this.state;

    if (name !== '') {
      const newOption = {
        name,
        id: options.length + 1,
      };

      this.setState({
        value: newOption, // select new option
      });

      input.onChange(newOption);
    }
  }

  render() {
    const { value, options } = this.state;
    const {
      placeholder, input, valueField, textField, messages,
    } = this.props;

    return (
      /* <DropdownList
        filter="contains"
        data={options}
        value={value}
        allowCreate="onFilter"
        onCreate={name => this.handleCreate(name)}
        onChange={(value) => { this.setState({ value });input.onChange(value);}}
        autofocus
        placeholder={placeholder}
        valueField={valueField}
        textField={textField}
        messages={messages}
      /> */
      <DropdownList
        filter="contains"
        data={options}
        value={input.value}
        allowCreate="onFilter"
        onCreate={name => this.handleCreate(name)}
        onChange={(value) => { this.setState({ value }); input.onChange(value); }}
        autofocus
        placeholder={placeholder}
        valueField={valueField}
        textField={textField}
        messages={messages}
      />
    );
  }
}

export default MACreateDropdownList;
