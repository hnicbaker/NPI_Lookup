import React, {Component} from 'react';
import { Form, Button, Col } from "react-bootstrap";
import axios from "axios";



class EntryForm extends Component {
constructor(props) {
  super(props)
  this.state = {
    validated: false
  }
}


handleSubmit(e) {

const form = e.currentTarget;
if (form.checkValidity() === false) {
  e.preventDefault();
  e.stopPropagation();
  
} else{
  e.preventDefault();
}
this.setState({ 
  validated: true


});

}

handleClick = (e) => {
let currentNPI = this.state.npiNumber;

axios.get(`/lookupNPI/${currentNPI}`,{
  headers: {
      'Content-Type': 'application/json'
  }
  })

  .then(response => {

    let data = response.data;
    let npiField = document.getElementById('formGridNpiNumber').value;
    let resultCount = data.result_count;

if(resultCount === 0){
  alert("No providers found. NPI may be invalid.");
}else if(npiField === ""){
  alert("No providers found. NPI may be invalid.");
}else {

    let firstName = data.results[0].basic.first_name;
    let lastName = data.results[0].basic.last_name;  
    let address = data.results[0].addresses[0].address_1;
    let address2 = data.results[0].addresses[0].address_2; 
    let city = data.results[0].addresses[0].city; 
    let state = data.results[0].addresses[0].state; 
    let zip = data.results[0].addresses[0].postal_code; 
    let phone = data.results[0].addresses[0].telephone_number; 


  document.getElementById('formGridFirstName').value = firstName;
  document.getElementById('formGridLastName').value = lastName;
  document.getElementById('formGridAddress1').value = address;
  document.getElementById('formGridAddress2').value = address2;
  document.getElementById('formGridCity').value = city;
  document.getElementById('formGridState').value = state;
  document.getElementById('formGridZip').value = zip;
  document.getElementById('formGridPhoneNumber').value = phone;
}
    });

    
}

handleChange = (e) => {
const element = e.target
const { name, value } = element

const newState = {}
newState[name] = value

this.setState(newState)
console.log(this.state)


}

  
render() {
const { validated } = this.state;
  return (
    <div className="formBox">
      <Form      
        noValidate
        validated={validated}
        onChange={e => this.handleChange(e)}
        onSubmit={e => this.handleSubmit(e)}>


          <Form.Row>  
          <Form.Group as={Col} controlId="formGridNpiNumber">
            <Form.Label>NPI Number</Form.Label>
            <Form.Control name="npiNumber" type="number" placeholder="NPI Number" required />
            <Form.Control.Feedback type="invalid"> Please provide a valid NPI number. </Form.Control.Feedback>
            <Button onClick={e => this.handleClick(e)}  variant="secondary" className="importButton">Import</Button>
          </Form.Group>
          
          </Form.Row> 

          <Form.Row>

        <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control name="firstName" placeholder="Enter First Name" required/>
            <Form.Control.Feedback type="invalid"> Please enter provider's first name. </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control name="lastName" placeholder="Enter Last Name" required/>
            <Form.Control.Feedback type="invalid"> Please enter provider's last name. </Form.Control.Feedback>
          </Form.Group>
          </Form.Row>

        <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter Email" required/>
            <Form.Control.Feedback type="invalid"> Please provide a valid email address. </Form.Control.Feedback>
          </Form.Group>

          <Form.Row>
        <Form.Group as={Col} controlId="formGridPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control name="phoneNumber" type="tel" placeholder="Enter Phone Number" required/>
            <Form.Control.Feedback type="invalid"> Please provide a valid phone number. </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control name="address" placeholder="1234 Main St" required/>
          <Form.Control.Feedback type="invalid"> Please provide a valid address. </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control name="address2" placeholder="Apartment, studio, or floor"/>
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control name="city" required/>
            <Form.Control.Feedback type="invalid"> Please provide a city. </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control name="state" maxLength="2" required/>
            <Form.Control.Feedback type="invalid"> Please provide a state. </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control name="zip" required/>
            <Form.Control.Feedback type="invalid"> Please provide a zip. </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

    

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}
}

export default EntryForm;