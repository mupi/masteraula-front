import React, { Component } from 'react';
import {
  Nav, NavItem, NavLink, TabContent, TabPane,
} from 'reactstrap';
import DocumentHeader from 'components/document/DocumentHeader';
import DocumentQuestions from 'components/document/DocumentQuestions';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';

class EditDocumentPage extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.setFields = this.setFields.bind(this);
    this.state = {
      name: '',
      schoolName: '',
      course: '',
      teacherName: '',
      studentName: '',
      class: '',
      grade: '',
      date: '',
      questions: [{
        id: '100',
        question: 'Assinale a alternativa que melhor expresse o efeito de humor contido na tirinha:',
        disciplines: [
          { name: 'Química' },
          { name: 'Física' },
        ],
        source: 'ENEM',
        year: '2010',
        difficulty: 'Fácil',
        author: 'Thiago Oliveira dos Santos',
        teachingLevels: [
          { name: 'Ensino Médio' },
          { name: 'Ensino Superior' },
        ],
      },
      ],
    };
  }

  componentDidMount(){
  }

  setFields(field, event) {
    const prevState = this.state;
    if (prevState[field] === 'on') {
      prevState[field] = '';
    } else {
      prevState[field] = event.target.value;
    }
    this.setState(prevState);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      const prevState = this.state;
      prevState.activeTab = tab;
      this.setState({
        prevState,
      });
    }
  }

  render() {
    const { activeDocument, removeSelectedQuestion } = this.props;

    return (
      <HomeUserPage>
        <div className="c-document">
          <DocumentHeader setFields={this.setFields} />
          <DocumentQuestions
            activeDocument={activeDocument}
            removeSelectedQuestion={removeSelectedQuestion}
          />
        </div>
      </HomeUserPage>);
  }
}

export default EditDocumentPage;
