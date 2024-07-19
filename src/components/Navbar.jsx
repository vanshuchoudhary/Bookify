import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useHistory } from 'react-router-dom'
import { Auth } from "firebase/auth";
import './navcss.css'
import { useState } from "react";

// import { useNavigate } from "react-router-dom";
// firebaseAuth
import {useNavigate} from 'react-router-dom';
import { useFirebase } from "../context/Firebase";



   


 

const MyNavbar = () => {

  const [searchTerm, setSearchTerm] = useState('');
  

  // Function to handle search
  const handleSearch = () => {
    // Call your search function or perform any action with the search term
    console.log("Search term:", searchTerm);
    
    // You can replace the console.log with any function call or action you want to perform with the search term
  };


  const firebase=useFirebase();
  const navigate = useNavigate();

  const handleLogout=async ()=>{
       try{
          await firebase.logout1();
          navigate('/login')
       } catch(e){
          console.log(e.message)
       }
  }


  
    // handle logout
    // const history = useHistory(); 

    // const handleLogout = () => {
      // Auth.signOut().then(() => {
          // history.push('/login');
      // })
  // }

  // const navigate = useNavigate();
 
  return (<>
    {/* <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/book/list">Add Listing</Nav.Link>
          <Nav.Link href="/book/orders">Orders</Nav.Link>
         
        </Nav>
      </Container>  
    </Navbar> */}
    
    {/* <nav class="navbar navbar-dark bg-dark fixed-top"> */}
    <nav class="navbar navbar-expand-lg ">
  <div class="container">
    <a class="navbar-brand me-auto" href="/" className="logo1">Bookify!</a>
    <button   class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" ></span>
    </button>
    <div class="offcanvas offcanvas-end text-bg" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel"></h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav justify-content-center flex-grow-1 pe-3">
          <li class="nav-item">
            <a class="nav-link  mx-lg-2" aria-current="page" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link mx-lg-2"  href="/book/list">Add listing</a>
          </li>

          <li class="nav-item">
            <a class="nav-link mx-lg-2"  href="/book/orders">Orders</a>
          </li>

          <li class="nav-item">
            <a class="nav-link mx-lg-2"  href="/book/cart">Cart</a>
          </li>

         
          
          
        </ul>
     
        {/* <div className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <button className="btn btn-outline-success" type="button" onClick={handleSearch}>Search</button>
            </div> */}

      </div>
    </div>

   

          {firebase.isLoggedIn ?( <a  class="login-button" onClick={handleLogout}>logout</a>):( <a  class="login-button" onClick={handleLogout}>login</a>)}

  </div>
</nav>
    

    </>

  );
};

export default MyNavbar;


   {/* <form class="d-flex mt-3" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-success" type="submit">Search</button>
        </form> */}


