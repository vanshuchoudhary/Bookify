import React, { useEffect, useState } from "react";
import CardGroup from "react-bootstrap/CardGroup";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import BookCard from "../components/Card";
import { useFirebase } from "../context/Firebase";
import { Button } from "react-bootstrap";
import Typewriter from 'typewriter-effect'
import  './style1.css'
// import "./cards.css";

const HomePage = () => {
  const firebase = useFirebase();

  const [bookst, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    firebase.listAllBooks().then((books) => setBooks(books.docs));
  }, []);

  
  // const handleSearchChange = (e) => {
  //   setSearchQuery(e.target.value);
  // };

  // const [filteredBooks,setfilteredBooks]=useState('')

  const handleSearch=()=>{
   return bookst.filter(
    (book)=>
      book.data().name && book.data().name.toLowerCase().includes(searchQuery.toLowerCase())
    // console.log(book)
   )
}

console.log("kkkkkkkkkkkkk")
console.log(handleSearch());
console.log("kkkkkkkkkkkkk")
console.log(bookst);

  

  return (
    <div >

<section class="showcase-area" id="showcase">
        <div class="showcase-container">
        </div>

        <div className="text">
            <h1 class="main-title">Flat 50% Off</h1>
             <p>For Students</p>
              {/* <a href="#food-menu" class="btn btn-primary">Menu</a>  */}
              <h1 className="text1">
                <Typewriter
                  options={{
                    autoStart:true,
                    loop:true,
                    delay:70,
                    strings:["Hi! you can buy and list your products"]
                  }}
                  />
              </h1>

              </div>    
              
      
       
    </section>

     

     

      {/* <CardGroup> */}
      <Container fluid='md'>

      <Form className="my-4">
          <Form.Control 
            type="text" 
            placeholder="Search for a book..." 
            value={searchQuery}
            // onChange={handleSearchChange}
            onChange={(e)=>setSearchQuery(e.target.value)}
          />
        </Form>
       

    <section className="page card-1-page">
    <div className="cards">
    
   

      {  handleSearch().map((book) => (
          <label id={book.name} key={book.name}>
          <input type="checkbox" />
          <BookCard
            link={`/book/view/${book.id}`}
            key={book.id}
            id={book.id}
            {...book.data()}
          />
          </label>
        )) 
}

</div>
  </section>

  </Container>

      {/* </CardGroup> */}
      {/* <button  onClick={(e) => navigate(/login)}>Logout</button> */}
      {/* <button onClick={this.handleClick }>Click Me</button> */}
      
    </div>
  );
};

export default HomePage;
