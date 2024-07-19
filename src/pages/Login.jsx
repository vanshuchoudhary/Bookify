// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";

// import { useFirebase } from "../context/Firebase";

// const LoginPage = () => {
//   const firebase = useFirebase();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   useEffect(() => {
//     if (firebase.isLoggedIn) {
//       // navigate to home
//       navigate("/");
//     }
//   }, [firebase, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("login in a user...");
//     const result = await firebase.singinUserWithEmailAndPass(email, password);
//     console.log("Successfull", result);
//   };

//   return (
//     <div className="container mt-5">
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3" controlId="formBasicEmail">
//           <Form.Label>Email address</Form.Label>
//           <Form.Control
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             type="email"
//             placeholder="Enter email"
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formBasicPassword">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             type="password"
//             placeholder="Password"
//           />
//         </Form.Group>

//         <Button variant="primary" type="submit">
//           Login
//         </Button>
//       </Form>
//       <h1 className="mt-5 mb-5">OR</h1>
//       <Button onClick={firebase.signinWithGoogle} variant="danger">
//         Signin with Google
//       </Button>
//     </div>
//   );
// };

// export default LoginPage;



import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
// import { useFirebase, useNavigate } from "./yourFirebaseHooks"; 
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import './logg.css'
import logoImage from './im2.jpg';

const LoginPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logst,setLogst]=useState("true")

  useEffect(() => {
    if (firebase.isLoggedIn) {
      // navigate to home
      navigate("/");
    }
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Logging in a user...");
    try{
    const result = await firebase.singinUserWithEmailAndPass(email, password);
    console.log("Successful", result);
    }catch(e)
    {
      setLogst(false)
      console.log(e);
    } 
    
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("Logging in a user...");
  //   try {
  //       const result = await firebase.signinUserWithEmailAndPassword(email, password);
  //       console.log("Successful", result);
  //       // Handle successful sign-in, e.g., redirect to another page
  //   } catch (error) {
  //       // Handle sign-in errors
  //       console.error("Error signing in:", error.message);
  //       // You can display an error message to the user, clear the input fields, etc.
  //   }
// };

  return (
    <div className="box">
      <div className="login-card">
      {/* <img src={logoImage} alt="Avatar" className="img_logo" /> */}
        <h2>Login</h2>
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter email"
              className="control"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              className="control"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="control">
            Login
          </Button>
        </Form>

        <h3>-OR-</h3>
        <Button
          onClick={firebase.signinWithGoogle}
          variant="danger"
          className="control"
        >
         
          Sign in with Google
        </Button>

        {logst?<p></p>:<p>wrong email or password</p>}
        <p>click here to
            <a   href="/register">Register</a>
          </p>
      </div>
    </div>
  );
};

export default LoginPage;
