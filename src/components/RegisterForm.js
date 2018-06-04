import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:''
    }
  }
  render() {
    return (
      <div>
          <div>
           <Input
             placeholder="Enter your First Name"
             onChange = {(event,newValue) => this.setState({first_name:newValue})}
             />
           <br/>
           <Input
             placeholder="Enter your Last Name"
             onChange = {(event,newValue) => this.setState({last_name:newValue})}
             />
           <br/>
           <Input
             placeholder="Enter your Email"
             type="email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <Input
             type = "password"
             placeholder="Enter your Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <Button label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
          </div>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Register;
