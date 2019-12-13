import React, { Component } from 'react';
import MultiselectReactWidget from 'react-widgets/lib/Multiselect';

const filterLastName = (topic, value) => {
  const normalizedTopic = topic.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const normalizedValue = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  return normalizedTopic.indexOf(normalizedValue) >= 0;
};

class Multiselect extends Component {
  constructor() {
    super();

    this.state = {
      param: '',
    };
  }

  onSearch = (param) => {
    const { listTopicSuggestions } = this.props;
    if (!listTopicSuggestions) {
      return;
    }
    if (param && param.length === 3) {
      listTopicSuggestions(param);
    }
    this.setState({
      param,
    });
  };

  getData = () => {
    const { data, listTopicSuggestions } = this.props;
    const { param } = this.state;

    if (!listTopicSuggestions || (param && param.length >= 3)) {
      return data;
    }
    return [];
  };

  messages = () => {
    const { param } = this.state;
    const { listTopicSuggestions } = this.props;
    if (listTopicSuggestions && param.length < 3) {
      return {
        emptyList: 'Insira ao menos 3 caracteres para mostrar resultados',
        emptyFilter: 'Não existem resultados que coincidam',
      };
    }
    return {
      emptyList: 'Não existem resultados',
      emptyFilter: 'Não existem resultados que coincidam',
    };
  };

  render() {
    const {
      input, placeholder, valueField, textField,
      meta: { touched, error, warning },
    } = this.props;

    return (
      <div>
        <MultiselectReactWidget
          {...input}
          onBlur={() => input.onBlur()}
          value={input.value || []}
          data={this.getData()}
          valueField={valueField}
          textField={textField}
          placeholder={placeholder}
          messages={this.messages()}
          onSearch={this.onSearch}
          filter={filterLastName}
        />
        { touched
            && ((error && (
            <span className="error-message-text">
              {error}
            </span>
            ))
            || (warning && (
            <span>
              {' '}
              {warning}
              {' '}
            </span>
            )))
          }
      </div>
    );
  }
}

export {
  Multiselect as default,
};
