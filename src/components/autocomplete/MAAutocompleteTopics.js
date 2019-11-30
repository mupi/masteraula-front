import React from 'react';
import Autosuggest from 'react-autosuggest';

class MAAutocompleteTopics extends React.Component {
  getSuggestions = () => {
    // const { value } = this.state;
    const { suggestions, input } = this.props;

    if (!suggestions) {
      return [];
    }
    const normalizedValue = input.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return suggestions.filter((suggestion) => {
      const normalizedName = suggestion.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      return normalizedName.indexOf(normalizedValue) >= 0;
    });
  }

  onSuggestionsFetchRequested = ({ value }) => {
    const { fetchSuggestions } = this.props;
    if (value.trim().length === 3) {
      fetchSuggestions(value);
    }
  }

  onSuggestionSelected = (_event, { suggestion }) => {
    const { input, onSubmit } = this.props;

    input.onChange(suggestion.name);
    onSubmit(suggestion.name);
  }

  getSuggestionValue = suggestion => suggestion.name;

  renderSuggestion = suggestion => (<span>{suggestion.name}</span>);

  shouldRenderSuggestions = value => value.trim().length >= 3

  onChange = (_event, { newValue }) => {
    const { input } = this.props;
    input.onChange(newValue);
  }

  render() {
    const { input } = this.props;
    const inputProps = {
      placeholder: 'Pesquisar por palavras chaves no banco de questões',
      value: input.value,
      onChange: this.onChange,
    };

    return (
      <Autosuggest
        suggestions={this.getSuggestions()}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        shouldRenderSuggestions={this.shouldRenderSuggestions}
        inputProps={inputProps}
      />
    );
  }
}
export default MAAutocompleteTopics;
