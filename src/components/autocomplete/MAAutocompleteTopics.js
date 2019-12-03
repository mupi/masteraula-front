import React from 'react';
import Autosuggest from 'react-autosuggest';

class MAAutocompleteTopics extends React.Component {
  constructor() {
    super();
    this.state = { suggestions: [] };
  }

  getSuggestions = () => {
    // const { value } = this.state;
    const { allSuggestions, input } = this.props;

    if (!allSuggestions) {
      return [];
    }

    const normalizedValue = input.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return allSuggestions.filter((suggestion) => {
      const normalizedName = suggestion.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      return normalizedName.indexOf(normalizedValue) >= 0;
    }).slice(0, 15);
  }

  onSuggestionsFetchRequested = ({ value }) => {
    const { fetchSuggestions } = this.props;
    if (value.trim().length === 3) {
      fetchSuggestions(value);
    } else if (value.trim().length > 3) {
      this.setState({ suggestions: this.getSuggestions() });
    }
  }

  onSuggestionSelected = (_event, { suggestion }) => {
    const { input, onSubmit } = this.props;

    input.onChange(suggestion.name);
    onSubmit(suggestion.name);
  }

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  }

  getSuggestionValue = suggestion => (suggestion ? suggestion.name : '');

  renderSuggestion = suggestion => (<span>{suggestion.name}</span>);

  shouldRenderSuggestions = value => value.trim().length >= 3

  onChange = (_event, { newValue }) => {
    const { input } = this.props;
    input.onChange(newValue);
  }

  render() {
    const { input, allSuggestions } = this.props;
    const { suggestions } = this.state;
    const inputProps = {
      placeholder: 'Pesquisar por palavras chaves no banco de questões',
      value: input.value,
      onChange: this.onChange,
    };

    return (
      <Autosuggest
        suggestions={suggestions.length !== 0 ? suggestions : allSuggestions.slice(0, 15)}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={this.getSuggestionValue}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        renderSuggestion={this.renderSuggestion}
        shouldRenderSuggestions={this.shouldRenderSuggestions}
        inputProps={inputProps}
      />
    );
  }
}
export default MAAutocompleteTopics;
