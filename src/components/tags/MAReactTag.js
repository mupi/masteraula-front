import React, { Component } from 'react';
import ReactTags from 'react-tag-autocomplete';

class MAReactTags extends Component {
  static handleValidate(tag) {
    return tag.name.length <= 50 && tag.name.trim() !== '';
  }

  constructor(props) {
    super(props);

    this.state = {
      tags: [],
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleValidate = MAReactTags.handleValidate.bind(this);
  }

  componentDidMount() {
    const { value } = this.props;
    const tags = value === '' ? [] : value.split(',').map(tag => ({ name: tag, id: tag }));
    this.setState({ tags });
  }

  handleDelete(i) {
    const { onChange } = this.props;
    const { tags } = this.state;

    tags.splice(i, 1);
    this.setState({ tags });

    const value = tags.map(t => (t.name)).join(',');
    onChange(value);
  }

  handleAddition(tag) {
    const { onChange } = this.props;
    let { tags } = this.state;

    const newTag = {
      id: tag.name,
      name: tag.name,
    };

    tags = [].concat(tags, newTag);
    this.setState({ tags });

    const value = tags.map(t => (t.name)).join(',');
    onChange(value);
  }

  render() {
    const { placeholder } = this.props;
    const { tags } = this.state;
    return (
      <ReactTags
        tags={tags}
        handleDelete={this.handleDelete}
        handleAddition={this.handleAddition}
        handleValidate={this.handleValidate}
        placeholder={placeholder}
        allowNew
        delimiterChars={[',']}
      />
    );
  }
}

export default MAReactTags;
