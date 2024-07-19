import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Modal}  from 'react-bootstrap'; 
import { useNavigate } from "react-router-dom";
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { useFirebase } from "../context/Firebase";

const ListingPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [price, setPrice] = useState("");
  const [coverPic, setCoverPic] = useState("");

  const [showModal, setShowModal] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if(firebase.isLoggedIn){
   
  //   await firebase.handleCreateNewListing(name, isbnNumber, price, coverPic);
  //   await toast.success("Your book has been listed successfully!");
  //   }
  //   else{
  //     setShowModal(true);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !isbnNumber || !price || !coverPic) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (firebase.isLoggedIn) {
      try {
        await firebase.handleCreateNewListing(name, isbnNumber, price, coverPic);
        toast.success("Your book has been listed successfully!");
        setName("");
        setIsbnNumber("");
        setPrice("");
        setCoverPic("");
      } catch (error) {
        toast.error("Failed to list the book. Please try again.");
      }
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter Book Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Book name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            onChange={(e) => setIsbnNumber(e.target.value)}
            value={isbnNumber}
            type="text"
            placeholder="ISBN Number"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="text"
            placeholder="Enter Price"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Cover Pic</Form.Label>
          <Form.Control
            onChange={(e) => setCoverPic(e.target.files[0])}
            type="file"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Authentication Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please log in to perform this action.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => navigate('/login')}>
            Log In
          </Button>
        </Modal.Footer>
      </Modal>
     
      <ToastContainer />

    </div>
  );
};

export default ListingPage;
