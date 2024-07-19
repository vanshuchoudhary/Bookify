// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";

// import { useFirebase } from "../context/Firebase";
// import '../pages/cards.css'

// const BookCard = (book) => {
//   const firebase = useFirebase();
//   const navigate = useNavigate();

//   const [url, setURL] = useState(null);
//   const [remove,setRemove]=useState(true);

//   useEffect(() => {
//     firebase.getImageURL(book.imageURL).then((url) => setURL(url));
//   }, []);

//   const handleAddToCart=()=>{
//     // var book1=book;
//     var book1 = Object.assign({}, book); // Create a shallow copy of 'book'
//     book1['qty1']=1;
//     book1['totalPrice']=book1.qty*book1.price
//     firebase.AddToCart(book1.name,book1.isbn,book.price,book1.id,book1.qty1)
//     .then(() => setRemove(true));
//   }

//   useEffect(() => {
//     firebase.isBookInCart(book.id).then((exists) => setRemove(exists));
//   }, [book.id, firebase]);

  
//   // const RemoveCart = (pid) => {
//   //   firebase.handleRemove(pid).then(() => {
//   //     setCarts((prevCarts) => prevCarts.filter((cart) => cart.data().id !== pid));
//   //     console.log("Deleted");
//   //   });
//   //   setRemove(!remove)
//   // };

//   const handleRemoveCart=(pid)=>{
//     firebase.RemoveCart(pid)
//     .then(()=>setRemove(false));
//   }


// // const handleRemoveFromCart = (pid) => {
// //   firebase.RemoveCart(pid)
// //     .then(() => setIsInCart(false));
// // };

//   console.log(book);

//   return (
   
    
 
//     <div className="card">
// <div className="front">
//   <header className="img">
//     {/* <h2>{book.name}</h2> */}
//     {/* <div className="img"> */}
//     <Card.Img variant="top" src={url} />
//     {/* </div> */}
    
//     {/* <span className="material-symbols-outlined"> more_vert </span> */}
//   </header>
//   <var className="phead">{book.name}</var>
//   <h5 className="desp">This book has a title {book.name} and this book is sold by{" "}
//         {book.displayName} </h5>
//   <h4>Rs.{book.price}</h4>
//   <Button onClick={(e) => navigate(book.link)} variant="primary">
//            View
//          </Button>
//          {remove?
//          <Button onClick={handleAddToCart} variant="primary"style={{ marginLeft: '20px' }} id={book.id}>
//            add to cart
//          </Button>:
//          <Button   onClick={() => handleRemoveCart(book.id)} variant="danger"style={{ marginLeft: '20px' }} id={book.id}>
//            remove 
//          </Button>}

// </div>
// <div className="back">
//   <header>
//     <h2>{book.name}</h2>
//     <span className="material-symbols-outlined"> close </span>
//   </header>
//   <p>More Information</p>
// </div>
// </div>
     
   
//   );
// };

// export default BookCard;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Modal}  from 'react-bootstrap'; 

import { useFirebase } from "../context/Firebase";
import '../pages/cards.css';

const BookCard = (book) => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const [url, setURL] = useState(null);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    firebase.getImageURL(book.imageURL).then((url) => setURL(url));
  }, [firebase, book.imageURL]);

  useEffect(() => {
    firebase.isBookInCart(book.id).then((exists) => setInCart(exists));
  }, [book.id, firebase]);

  const handleAddToCart = () => {
    if (firebase.isLoggedIn) {
    const bookDetails = { ...book, qty: 1, totalPrice: book.qty * book.price };
    firebase.AddToCart(bookDetails.name, bookDetails.isbn, bookDetails.price, bookDetails.id, bookDetails.qty)
    
      .then(() => setInCart(true));
      console.log("sucessfully added to cart")
    }
    else{
      setShowModal(true);
    }
  };

  const handleRemoveFromCart = () => {
    firebase.RemoveCart(book.id)
      .then(() => setInCart(false));
  };


  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (
    <div className="card">
      <div className="front">
        <header className="img">
          <Card.Img variant="top" src={url} />
        </header>
        <var className="phead">{book.name}</var>
        <h5 className="desp">
          This book has a title {book.name} and is sold by {book.displayName}
        </h5>
        <h4>Rs.{book.price}</h4>
        {firebase.isLoggedIn ? ( <Button onClick={() => navigate(book.link)} variant="primary">
          View
        </Button>):( <Button  variant="primary">
          View
        </Button>)}
       
        {inCart ? (
          <Button
            onClick={handleRemoveFromCart}
            variant="danger"
            style={{ marginLeft: '20px' }}
            id={book.id}
          >
            Remove
          </Button>
        ) : (
          <Button
            onClick={handleAddToCart}
            variant="primary"
            style={{ marginLeft: '20px' }}
            id={book.id}
          >
            Add to cart
          </Button>
        )}
      </div>
      <div className="back">
        <header>
          <h2>{book.name}</h2>
          <span className="material-symbols-outlined">close</span>
        </header>
        <p>More Information</p>
      </div>

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

    </div>
  );
};

export default BookCard;



