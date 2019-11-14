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
    const { listTopicSuggestions, topicsSelected, disciplinesSelected } = this.props;
    if (value.trim().length % 3 === 0 && value.trim().length > 0) {
      listTopicSuggestions(value, topicsSelected, disciplinesSelected);
    }
  }

  onSuggestionsClearRequested = () => {
    /* this.setState({ suggestions: [] }); */
  };

  onSuggestionSelected = (event, { suggestion }) => {
    const {
      disciplinesSelected, topicsSelected, addSelectedTopicFilter, listTopicFilters,
    } = this.props;
    addSelectedTopicFilter(suggestion);
    listTopicFilters(disciplinesSelected, [...topicsSelected, suggestion]);

    this.setState({ value: '' });
  }

  render() {
    const { value } = this.state;
    const { topicSuggestions, isFetchingTopicSuggestions } = this.props;
    const inputProps = {
      placeholder: 'Insira um tópico',
      value,
      onChange: this.onChange,
    };
    const isInputBlank = value.trim() === '';
    const noSuggestions = !isInputBlank && topicSuggestions && topicSuggestions.length === 0;

    return (
      <>
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
        {
          noSuggestions && !isFetchingTopicSuggestions
            && (
            <div className="error-message-text">
              Não há resultados
            </div>
            )
        }
      </>
    );
  }
}
export default MAAutocompleteTopics;
