import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "../../styles/Signup.module.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;
  const history = useHistory();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async(event) => {
    event.preventDefault()
    try{
      await axios.post("/dj-rest-auth/registration/", signUpData)
      history.push('/signin')
    }catch (err) {
      console.log(err)
    }
  }

  return (
    <Form onSubmit={handleSubmit} className={styles.FormContainer}>
      <h1 className="text-center mb-5">
        Welcome to skateSpot please fill in your info
      </h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address :</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="Enter username"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password :</Form.Label>
        <Form.Control
          type="password"
          name="password1"
          onChange={handleChange}
          value={password1}
          placeholder="Enter password"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Repeat Password :</Form.Label>
        <Form.Control
          type="password"
          name="password2"
          onChange={handleChange}
          value={password2}
          placeholder="Confirm password"
        />
      </Form.Group>

      <Button className={styles.FormButton} type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default SignUp;
