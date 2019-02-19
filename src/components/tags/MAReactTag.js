import React, { Component } from 'react';

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
    console.log("INI COMPONENT DID MOUNT - MA REACTTAG");
    console.log(tags);
    console.log("FIN COMPONENT DID MOUNT - MA REACTTAG");

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
  }

  render() {
    return (
      <ReactTags
        tags={this.state.tags}
        handleDelete={this.handleDelete.bind(this)}
        handleAddition={this.handleAddition.bind(this)}
        placeholder="Separe as tags com vírgulas"
        allowNew
        delimiterChars={[',']}
      />
    );
  }
}

export default MAReactTags;
