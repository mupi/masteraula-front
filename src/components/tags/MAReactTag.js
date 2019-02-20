import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTags from 'react-tag-autocomplete';

class MAReactTags extends Component {
  constructor(props) {
    super(props);

   // const { tags } = this.props;

    this.state = {
      tags: [],
    };
  }

  componentDidMount() {
    const { tags } = this.props;
    this.setState({ tags });
  }

  handleDelete(i) {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
  }

  handleAddition(tag) {
    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags });
    console.log("en add");
    console.log(tags);
  }

  handleValidate(tag) {
    return tag.name.length <= 50;
  }

  render() {
    const {onChange} = this.props;
    return (
      <ReactTags
        tags={this.state.tags}
        handleDelete={this.handleDelete.bind(this)}
        handleAddition={this.handleAddition.bind(this)}
        handleValidate={this.handleValidate.bind(this)}
        placeholder="Separe as tags com vírgulas"
        allowNew
        delimiterChars={[',']}
        handleInputChange={e => onChange(e)}
       

      />
    );
  }
}
/*
MAReactTags.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
  }).isRequired,
  tags: PropTypes.array.isRequired,
 // multi: PropTypes.bool,
  className: PropTypes.string
};*/

export default MAReactTags;
