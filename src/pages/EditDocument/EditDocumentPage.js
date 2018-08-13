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

    this.setFields = this.setFields.bind(this);
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

  render() {
    return (
      <HomeUserPage>
        <div className="c-document">
          <DocumentHeader data={this.props.activeDocument} setFields={this.setFields} />
          <DocumentQuestions data={this.props.activeDocument} />
        </div>
      </HomeUserPage>);
  }
}

export default EditDocumentPage;
