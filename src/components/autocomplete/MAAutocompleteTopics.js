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
    const { listTopicSuggestions, filter } = this.props;
    if (value.trim().length % 3 === 0 && value.trim().length > 0) {
      listTopicSuggestions(value, filter);
    }
  }

  onSuggestionsClearRequested = () => {
    /* this.setState({ suggestions: [] }); */
  };

  onSuggestionSelected = (event, { suggestion }) => {
    const {
      onSubmit,
    } = this.props;
    onSubmit(suggestion.name);
    this.setState({ value: suggestion.name });
  }

  render() {
    const { value } = this.state;
    const { topicSuggestions /* input */ } = this.props;
    const inputProps = {
      placeholder: 'Pesquisar por palavras chaves no banco de questões',
      value,
      onChange: this.onChange,
    };

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
  //        onChange={(value) => { this.setState({ value }); input.onChange(value); }}

        />
        { /*
          noSuggestions && !isFetchingTopicSuggestions
            && (
            <div className="error-message-text">
              Não há resultados
            </div>
            ) */
        }
      </>
    );
  }
}
export default MAAutocompleteTopics;
