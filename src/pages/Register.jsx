import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import './logg.css'

import { useFirebase } from "../context/Firebase";

const RegisterPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (firebase.isLoggedIn) {
      // navigate to home
      navigate("/");
    }
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signin up a user...");
    const result = await firebase.signupUserWithEmailAndPassword(
      email,
      password
    );
    console.log("Successfull", result);
  };

  return (
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
//           <Form.Text className="text-muted">
//             We'll never share your email with anyone else.
//           </Form.Text>
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
//           Create Account
//         </Button>
//         <p>click here to
//             <a   href="/login">Login</a>
//           </p>
//       </Form>
//     </div>
//   );
// };

<div className="box">
      <div className="login-card">
      {/* <img src={logoImage} alt="Avatar" className="img_logo" /> */}
        <h2>Register</h2>
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
            Create Account
          </Button>
          <p>click here to
              <a   href="/login">Login</a>
          </p>
        </Form>

        
       
       
      </div>
    </div>
  );
};

export default RegisterPage;
