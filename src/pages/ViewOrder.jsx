import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/Card";
import  './style1.css'

const OrdersPage = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);
  console.log("ttttt")
  console.log(firebase.isLoggedIn);

  useEffect(() => {
    if (firebase.isLoggedIn)
      firebase
        .fetchMyBooks(firebase.user.uid)
        ?.then((books) => setBooks(books.docs));
  }, [firebase]);

  console.log(books);

  if (!firebase.isLoggedIn) return <h1>Please log in</h1>;

  return (
    <div>
      
      <section className="page card-1-page">
    <div className="cards">
      {books.map((book) => (
        <BookCard
          link={`/books/orders/${book.id}`}
          key={book.id}
          id={book.id}
          {...book.data()}
        />
      ))}
      </div>
    </section>
    </div>
  );
};

export default OrdersPage;
