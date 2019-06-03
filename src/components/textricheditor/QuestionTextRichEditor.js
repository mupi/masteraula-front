import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Row, Col } from 'reactstrap';

class QuestionTextRichEditor extends Component {
  /* eslint-disable react/no-danger */
  constructor(props) {
    super(props);
    const html = '';
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }
  }


  onEditorStateChange= (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <Row>
        <Col>
          <Editor
            placeholder="Escreva o enunciado da questão aqui ..."
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
            toolbar={{
              options: ['inline', 'blockType'],
            }}
            localization={{
              locale: 'pt',
            }}
          />
          <div className="hidden">
            <textarea
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
