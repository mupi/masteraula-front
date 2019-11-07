import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
  {
    name: 'Guerra do Paraguai',
    year: 1972,
  },
  {
    name: 'II Guerra Mundial',
    year: 2000,
  },
  {
    name: 'Guerra do Pacífico',
    year: 1983,
  },
  {
    name: 'Guerra Fria',
    year: 2007,
  },
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang => lang.name.toLowerCase().slice(0, inputLength) === inputValue);
};

const shouldRenderSuggestions = value => value.trim().length % 3 === 0;


// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);
class MAAutocomplete extends Component {
  constructor(props) {
    super(props);
    const { suggestions } = this.props;
    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions,
    };
  }

    onChange = (event, { newValue }) => {
      this.setState({
        value: newValue,
      });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        suggestions: getSuggestions(value),
      });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: [],
      });
    };


    render() {
      const { value, suggestions } = this.state;
      // Autosuggest will pass through all these props to the input.
      const inputProps = {
        placeholder: 'Insira um tópico',
        value,
        onChange: this.onChange,
      };

      // Finally, render it!
      return (
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          shouldRenderSuggestions={shouldRenderSuggestions}
        />
      );
    }
}
export default MAAutocomplete;
