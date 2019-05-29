import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { getCleanCompleteStatement } from 'helpers/question';
import { Row, Col } from 'reactstrap';

class QuestionTextRichEditor extends Component {
  /* eslint-disable react/no-danger */
  constructor(props) {
    super(props);
    const html = '<p>Escreva seu enunciado ...</p>';
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }
  }

  uploadCallback = () => {
    return new Promise(
      (resolve, reject) => {
        resolve({ data: { link: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Clipart_owl.png" } });
      }
    );

  };

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
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
            toolbar={{
              image: { urlEnabled: true, uploadEnabled: true, uploadCallback: this.uploadCallback },
            }}
            localization={{
              locale: 'pt',
            }}
          />
          <div className="c-question__learning-object--text hidden">
            <div dangerouslySetInnerHTML={{ __html: getCleanCompleteStatement(draftToHtml(convertToRaw(editorState.getCurrentContent()))) }} />
          </div>
        </Col>
      </Row>
    );
  }
}
export default QuestionTextRichEditor; 
