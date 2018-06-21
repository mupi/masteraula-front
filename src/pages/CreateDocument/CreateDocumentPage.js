import React, { Component } from 'react';
import { Row, Container, Nav, NavItem, NavLink, TabContent, TabPane, Col, Button, Card, CardTitle, CardText } from 'reactstrap';
import DocumentForm from '../../components/document/DocumentForm.js';
import DocumentPreview from '../../components/document/DocumentPreview.js';
import HomeUserPage from "../HomeUser/HomeUserPage"
import classnames from 'classnames';


class CreateDocumentPage extends Component{
   constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render(){
    let data = {'schoolName':'Escolinha', 'course':'Matemática','teacherName':"Profa Daniela",
                'studentName':true, 'date':true, 'class':true, 'grade':true}
    return(
          <HomeUserPage>
            <div>
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
             Preview
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <DocumentForm />
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
               <DocumentPreview data={data}/>
            </Row>
          </TabPane>
        </TabContent>
      </div>
          </HomeUserPage>);
    }
}

export default CreateDocumentPage
