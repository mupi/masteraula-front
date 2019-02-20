import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
//import 'react-select/dist/react-select.css';

class RFReactSelect extends Component {
  constructor() {
    super()

    this.state = {
      createdOptions: []
    }

    this.onNewOptionClick = this.onNewOptionClick.bind(this)
  }

  render() {
    const { input , options, multi, className,
      newOptionCreator, promptTextCreator, isValidNewOption } = this.props
    const { name, value, onBlur, onChange, onFocus } = input;
    const allOptions = options.concat(this.state.createdOptions)
    const transformedValue = this.transformValue(value, allOptions, multi);

    return (
      <Select.Creatable
        className={className}
        isValidNewOption={isValidNewOption}
        multi={multi}
        name={name}
        newOptionCreator={newOptionCreator}
        onSelectResetsInput={false}
        onBlurResetsInput={false}
        options={allOptions}
        onChange={multi
          ? this.multiChangeHandler(onChange)
          : this.singleChangeHandler(onChange)
        }
        onBlur={() => onBlur(value)}
        onFocus={onFocus}
        onNewOptionClick={this.onNewOptionClick}
        promptTextCreator={promptTextCreator}
        ref='creatable'
        value={transformedValue}
        valueKey='value'
      />
    );
  }

  /**
   * Keep created options in local state or they will be lost
   * on re-render
   */
  onNewOptionClick(option) {
    const { props, select } = this.refs.creatable
    const { options } = props

    options.unshift(option)
    select.selectValue(option)

    this.setState({
      createdOptions: [option]
    })
  }

  /**
   * onChange from Redux Form Field has to be called explicity.
   */
  singleChangeHandler(func) {
    return function handleSingleChange(option) {
      func(option ? option.value : '');
    };
  }

  /**
   * onBlur from Redux Form Field has to be called explicity.
   */
  multiChangeHandler(func) {
    return function handleMultiHandler(values) {
      func(values.map(value => value.value));
    };
  }

  /**
   * For single select, Redux Form keeps the value as a string, while React Select
   * wants the value in the form { value: "grape", label: "Grape" }
   *
   * * For multi select, Redux Form keeps the value as array of strings, while React Select
   * wants the array of values in the form [{ value: "grape", label: "Grape" }]
   */
  transformValue(value, options, multi) {
    if (multi && typeof value === 'string') return [];

    const filteredOptions = options.filter(option => {
      return multi
        ? value.indexOf(option.value) !== -1
        : option.value === value;
    });

    return multi ? filteredOptions : filteredOptions[0];
  }
}

RFReactSelect.defaultProps = {
  multi: false,
  className: ""
};


export default RFReactSelect;