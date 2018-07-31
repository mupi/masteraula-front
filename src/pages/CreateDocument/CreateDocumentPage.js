import React, { Component } from 'react';
import {
  Nav, NavItem, NavLink, TabContent, TabPane,
} from 'reactstrap';
import classnames from 'classnames';
import DocumentForm from '../../components/document/DocumentForm.js';
import DocumentPreview from '../../components/document/DocumentPreview.js';
import HomeUserPage from '../HomeUser/HomeUserPage';


class CreateDocumentPage extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.setFields = this.setFields.bind(this);
    this.state = {
      activeTab: '1',
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
        ]
      }, {
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
      }],
    };
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
    return (
      <HomeUserPage>
        <div className="c-create-document">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                Monte seu documento
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                    Escolha as questões
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent className="c-create-document__tab-content" activeTab={this.state.activeTab} style={{ display: 'block' }}>
            <TabPane tabId="1">
              <DocumentForm setFields={this.setFields} />
            </TabPane>
            <TabPane tabId="2">
              <DocumentPreview data={this.state} />
            </TabPane>
          </TabContent>
        </div>
      </HomeUserPage>);
  }
}

export default CreateDocumentPage;
