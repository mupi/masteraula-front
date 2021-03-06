import React, { Component } from 'react';
import {
  EditorState, convertToRaw, ContentState,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Row, Col } from 'reactstrap';


class QuestionTextRichEditor extends Component {
  /* eslint-disable react/no-danger */
  constructor(props) {
    super(props);
    const { options } = props;

    const html = (props.value ? props.value : '');

    const htmlMedia = (options ? `<p></p>${html}` : html);

    const contentBlock = htmlToDraft(htmlMedia);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);

      this.state = {
        editorState,
      };

    }
  }

  onEditorStateChange = (editorState) => {
    const { onChange, value } = this.props;

    const newValue = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    if (value.trim() !== newValue.trim()) {
      onChange(newValue);
    }

    this.setState({
      editorState,
    });
  };


  render() {
    const { editorState } = this.state;
    const { placeholder, options } = this.props;

    const setEditorReference = (ref) => {
      this.editorReferece = ref;
      // if (ref) ref.focus();
    };

    return (
      <Row>
        <Col>
          <Editor
            editorRef={setEditorReference}
            placeholder={placeholder}
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
            toolbar={{
              options: options || ['inline', 'blockType'],
              embedded: {
                className: 'video-responsive',
              },
            }}
            localization={{
              locale: 'pt',
            }}
          />
          <div>
            <textarea
              hidden
              className="width-100"
              disabled
              value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            />
          </div>
        </Col>
      </Row>
    );
  }
}
export default QuestionTextRichEditor;
