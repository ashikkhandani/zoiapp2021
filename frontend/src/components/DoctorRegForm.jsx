// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { Form, Button, Image } from "react-bootstrap";
import specialistAPI from "../Context_APIs/specialistFields";
import DocImage from "../imgs/drReg.png";

// import "../styling/customRegForm.css";

import axios from "axios";

function DoctorRegForm() {
  // states
  const [DrSignUp, setDrSignUp] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmedPassword: "",
    licenceNumber: "",
    // specialistFields: [],
    street: "",
    houseNr: "",
    postalCode: "",
    city: "",
    country: "",
  });
  // Error message state
  const [message, setMessage] = useState("");
  // let specialist = [];
  const [specialist, setSpecialist] = useState([]);
  const handleSpecial = (item) => {
    setSpecialist([...specialist, item]);
  };
  // const { specialistFields } = DrSignUp;
  // add new Dr details
  const handleFormInput = (e) => {
    setDrSignUp({ ...DrSignUp, [e.target.name]: e.target.value });
  };

  // File state
  const [DrFile, setDrFile] = useState("");
  // upload File function
  const uploadFile = (e) => {
    setDrFile(e.target.files[0]);
  };

  // delete function specialist Field
  const deleteField = (e) => {
    const index = e.target.id;
    const newList = [...specialist]
    newList.splice(index,1)
    setSpecialist(newList)
    // setSpecialist([].splice(index,1))
    
  };

  //send to back end handler
  const sendToBackEnd = (e) => {
    //send form data to the back to save in MongoDB
    e.preventDefault();
    // console.log(DrFile);
    // new doctor data state

    const formData = new FormData();
    formData.append("firstName", DrSignUp.firstName);
    formData.append("lastName", DrSignUp.lastName);
    formData.append("email", DrSignUp.email);
    formData.append("mobileNumber", DrSignUp.mobileNumber);
    formData.append("password", DrSignUp.password);
    formData.append("confirmedPassword", DrSignUp.confirmedPassword);
    formData.append("licenceNumber", DrSignUp.licenceNumber);
    formData.append("specialistFields", specialist);
    formData.append("street", DrSignUp.street);
    formData.append("houseNr", DrSignUp.houseNr);
    formData.append("postalCode", DrSignUp.postalCode);
    formData.append("city", DrSignUp.city);
    formData.append("country", DrSignUp.country);
    formData.append("doctorFile", DrFile);

    // file data
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    if (DrSignUp.email !== "" && DrSignUp.password !== "") {
      console.log(formData);
      axios
        .post("http://localhost:5000/doctor/registration", formData, config)
        .then((res) => {
          console.log(res.data);
          setDrSignUp({
            firstName: "",
            lastName: "",
            email: "",
            mobileNumber: "",
            password: "",
            confirmedPassword: "",
            licenceNumber: "",
            // specialistFields: [],
            street: "",
            houseNr: "",
            postalCode: "",
            city: "",
            country: "",
          });
          // setMessage(res.data.msg);
          // redirecting to login page
          window.location.href = "/";
          // console.log("Sign up done! ");
        })
        .catch((error) => {
          console.log(error, "form Doctor");
        });
    } else {
      setMessage("Please fill the required fields!");
    }
  };
 
  //handle form Data
  // console.log(DrSignUp);

  // 2nd form test responsive
  
  return (
 

    <div className="doc-reg">
    <div >
    {/* <div style={{position: "fixed"}} > */}
    <Navigation />
    </div>
      
      {/* <div className="" > */}
        <div className="dr-reg-container">
          
                {/* Photo-Container  */}
                {/* <div className='reg-img-container'>
                  <Image src={DocImage} className='reg-img' />
                </div> */}
                  
                <div className="">
                  <Form
                    className="dr-signUpForm"
                    onSubmit={sendToBackEnd}
                    method="POST"
                  >
                    <div className="row">
                      {/* First Name */}
                      <div className="col-md-12">
                        <Form.Group
                          className="input-field "
                          controlId="formBasicFirstName"
                        >
                          <Form.Label className='form-label'>First Name:</Form.Label> <br />
                          <Form.Control
                            name="firstName"
                            type="text"
                            value={DrSignUp.firstName}
                            placeholder="First Name"
                            onChange={(e) => {
                              handleFormInput(e);
                            }}
                          />
                        </Form.Group>
                      </div>

                      {/* Last Name */}
                      <div className="col-md-12">
                        <Form.Group
                          className="input-field "
                          controlId="formBasicLastName"
                        >
                          <Form.Label className='form-label'>Last Name:</Form.Label> <br />
                          <Form.Control
                            name="lastName"
                            type="text"
                            value={DrSignUp.lastName}
                            placeholder="Last Name"
                            onChange={(e) => {
                              handleFormInput(e);
                            }}
                          />
                        </Form.Group>
                      </div>

                      {/* email */}
                      <div className="col-md-12">
                        <Form.Group
                          className="input-field "
                          controlId="formBasicEmail"
                        >
                          <Form.Label className='form-label'>Email address</Form.Label> <br /> 
                          <Form.Control
                            name="email"
                            type="email"
                            value={DrSignUp.email}
                            placeholder="Enter email"
                            onChange={(e) => {
                              handleFormInput(e);
                            }}
                          />
                        </Form.Group>
                      </div>

                      {/* contact Number */}
                      <div className="col-md-12">
                        <Form.Group
                          className="input-field "
                          controlId="formBasicMobileNumber"
                        >
                          <Form.Label className='form-label'>Mobile Number:</Form.Label> <br />
                          <Form.Control
                            name="mobileNumber"
                            type="number"
                            value={DrSignUp.mobileNumber}
                            placeholder="Enter phone number"
                            onChange={(e) => {
                              handleFormInput(e);
                            }}
                          />
                        </Form.Group>
                      </div>

                      {/* Licence Number */}
                      <div className="col-md-12">
                        <Form.Group
                          className="input-field "
                          controlId="formBasicLicenceNumber"
                        >
                          <Form.Label className='form-label'>Licence Number:</Form.Label> <br />
                          <Form.Control
                            name="licenceNumber"
                            type="text"
                            value={DrSignUp.licenceNumber}
                            placeholder="Enter licence number"
                            onChange={(e) => {
                              handleFormInput(e);
                            }}
                          />
                        </Form.Group>
                      </div>

                      {/* Specialist Field */}
                      <div className="col-md-12">
                        <Form.Group
                          controlId="exampleForm.ControlSelect1 "
                          className="input-field"
                        >
                          <Form.Label className='form-label'>Specialist In</Form.Label> <br />

                          <Form.Control
                            class="input-field col-md-12"
                            name="specialistFields"
                            as="select"
                            type="text"
                            onChange={(e) => {
                              console.log("onSelect is", e.target.value);
                              const selectedItem = e.target.value;
                              // handleSpecialistInput(selectedItem);
                              handleSpecial(selectedItem);
                            }}
                          >
                            {specialistAPI.map((item, index) => {
                              return (
                                <option key={index} value={item.field}>
                                  {item.field}
                                </option>
                              );
                            })}
                          </Form.Control>

                          <div className="discipline-container col-md-12">
                            
                            {specialist.map((item, index) => {
                              return (
                                <div
                                  id={index}
                                  key={index}
                                  className="reg-discipline"
                                  onClick={(e) => {
                                    deleteField(e);
                                  }}
                                >
                                  {item}
                                </div>
                              );
                            })}
                          </div>
                        </Form.Group>
                      </div>

                      {/* upload Files */}
                      <div className="col-md-12">
                        <Form className="input-field d-flex align-items-center">
                          <Form.Group>
                            <Form.File
                              name="doctorFile"
                              onChange={uploadFile}
                              // value={DrFile}
                              id="exampleFormControlFile1"
                              label="Upload Qualification:"
                            />
                          </Form.Group>
                        </Form>
                      </div>

                      {/* Address Details */}

                      {/* Street Name */}
                      <Form.Group
                        className="input-field name"
                        controlId="formGridAddress1"
                      >
                        <Form.Label className='form-label'>Address of Practice:</Form.Label> <br />
                        <Form.Control
                          name="street"
                          value={DrSignUp.street}
                          type="text"
                          placeholder="Street Name"
                          onChange={(e) => {
                            handleFormInput(e);
                          }}
                        />
                      </Form.Group>

                      {/* House Number */}
                      <Form.Group
                        className="input-field name"
                        controlId="formGridAddress1"
                      >
                        
                        <Form.Control
                          name="houseNr"
                          value={DrSignUp.houseNr}
                          type="number"
                          placeholder="House Nr"
                          onChange={(e) => {
                            handleFormInput(e);
                          }}
                        />
                      </Form.Group>

                      {/* Postal Code */}
                      <Form.Group
                        className="input-field name"
                        controlId="formGridZip"
                      >
                      
                        <Form.Control
                          name="postalCode"
                          value={DrSignUp.postalCode}
                          type="number"
                          placeholder="Postal Code"
                          onChange={(e) => {
                            handleFormInput(e);
                          }}
                        />
                      </Form.Group>

                      {/* City Name */}
                      <Form.Group
                        className="input-field name"
                        controlId="formGridCity"
                      >
                      
                        <Form.Control
                          name="city"
                          value={DrSignUp.city}
                          type="text"
                          placeholder="City"
                          onChange={(e) => {
                            handleFormInput(e);
                          }}
                        />
                      </Form.Group>
                      {/* Country Name */}
                      <Form.Group
                        className="input-field name"
                        controlId="formGridCountry"
                      >
                        <Form.Control
                          name="country"
                          value={DrSignUp.country}
                          type="text"
                          placeholder="Country"
                          onChange={(e) => {
                            handleFormInput(e);
                          }}
                        />
                      </Form.Group>
                      {/* Password */}
                      <div className="col-md-12">
                        <Form.Group
                          className="input-field "
                          controlId="formBasicPassword"
                        >
                          <Form.Label className='form-label'>Password:</Form.Label> <br />
                          <Form.Control
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={DrSignUp.password}
                            onChange={(e) => {
                              handleFormInput(e);
                            }}
                          />
                        </Form.Group>
                      </div>

                      {/* Confirm Password */}
                      <div className="col-md-12">
                        <Form.Group
                          className="input-field d-flex align-items-center"
                          controlId="formBasicConfirmPassword"
                        >
                          <Form.Control
                            name="confirmedPassword"
                            type="password"
                            placeholder="Confirm Password"
                            value={DrSignUp.confirmedPassword}
                            onChange={(e) => {
                              handleFormInput(e);
                            }}
                          />
                        </Form.Group>
                      </div>

                      <div className="reg-form-footer col-md-12">
                        <Form.Group controlId="formBasicCheckbox d-flex align-items-center">
                          <Form.Check
                            required
                            label="Agree to terms and conditions"
                            feedback="You must agree before submitting."
                            value={true}
                          />
                          <Form.Check
                            required
                            label="I confirm that this information is correct"
                            feedback="You must agree before submitting."
                            value={true}
                          />
                        </Form.Group>
                      </div>
                      {/* upload documents */}

                      <Button type="submit">Sign Up</Button>
                   
                    </div>
                  </Form>
                  {/* Log in form link */}
                  <div class="w-100 text-center">
                    <p class="p mt-4">
                      Have already an account!
                       <Button type="btn" href="/" className="login-link reg-discipline">
                  Log In
                </Button>
                    </p>
                  </div>
                </div>
             
        </div>
      {/* </div> */}
      <Footer />
    </div>
  );
}

export default DoctorRegForm;

