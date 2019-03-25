import React from 'react';
import Multiselect from 'react-widgets/lib/Multiselect';


//const tags = value === '' ? [] : value.split(',').map((tag, i) => ({ name: tag, id: i }));


class MAMultiSelectTag extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.defaultValue,
      extData: this.props.data
    }

    this._create = this._create.bind(this);
  }

  _create(name) {

    const tag = {
      name,
      id: name,
    };

    var value = this.state.value.concat(tag)
    var extData = this.state.extData.concat(tag)

    this.setState({
      extData,
      value
    })
  }

  componentDidUpdate() {
    let { onChange } = this.props.input
    onChange(this.state.value)
  }

  handleOnChange(value) {
    this.setState({ value })
  }

  render() {
    const input = this.props
    return (
      <Multiselect
        {...input}
        data={this.state.extData}
        onBlur={() => input.onBlur()}
        defaultValue={input.value}
        value={this.state.value || []}
        valueField="id"
        textField="name"
        onCreate={this._create}
        onChange={value => this.handleOnChange(value)}
      />
    )
  }
}


export default MAMultiSelectTag;
