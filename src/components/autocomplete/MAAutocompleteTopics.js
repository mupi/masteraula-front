import React from 'react';
import Autosuggest from 'react-autosuggest';

const getSuggestionValue = suggestion => suggestion.name;
const renderSuggestion = suggestion => (<span>{suggestion.name}</span>);
const shouldRenderSuggestions = value => (value.trim().length > 2);

class MAAutocompleteTopics extends React.Component {
  constructor() {
    super();
    this.state = { value: '' /* , suggestions: [] */ };
  }

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue });
  }

  onSuggestionsFetchRequested = ({ value }) => {
    const { listTopicSuggestions } = this.props;

    if (value.trim().length % 3 === 0 && value.trim().length > 0) {
      listTopicSuggestions(value);
    }
  }

  onSuggestionsClearRequested = () => {
    /* this.setState({ suggestions: [] }); */
  };

  onSuggestionSelected = (event, { suggestion }) => {
    const { addSelectedTopicFilter } = this.props;
    addSelectedTopicFilter(suggestion);
  }

  render() {
    const { value } = this.state;
    const { topicSuggestions } = this.props;
    const inputProps = {
      placeholder: 'Insira um tópico',
      value,
      onChange: this.onChange,
    };

    return (
      <Autosuggest
        suggestions={topicSuggestions || []}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        shouldRenderSuggestions={shouldRenderSuggestions}
        onSuggestionSelected={this.onSuggestionSelected}
      />
    );
  }
}
export default MAAutocompleteTopics;
