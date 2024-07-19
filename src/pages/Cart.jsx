import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import { Container, ListGroup, Row, Col, Button } from "react-bootstrap";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import './style1.css';
import './stylecart.css';

const Cartpage = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const params = useParams();
  const firebase = useFirebase();

  // const [carts, setCarts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (firebase.isLoggedIn) {
      firebase.listAllcarts().then((book) => firebase.setCarts(book.docs));
    }
  }, [firebase]);

  useEffect(() => {
    setTotal(
      firebase.carts.reduce((acc, curr) => acc + Number(curr.data().price) * curr.data().qty, 0)
    );
  }, [firebase.carts]);

  const cartProductIncrease = (id, qty) => {
    const newQty = qty + 1;
    firebase.cartUpdate(id, newQty).then(() => {
      firebase.setCarts((prevCarts) =>
        prevCarts.map((cart) =>
          cart.data().id === id ? { ...cart, data: () => ({ ...cart.data() }) } : cart
        )
      );
    });
  };

  const cartProductDec = (id, qty) => {
    if (qty > 1) {
      const newQty = qty - 1;
      firebase.cartUpdate(id, newQty).then(() => {
        firebase.setCarts((prevCarts) =>
          prevCarts.map((cart) =>
            cart.data().id === id ? { ...cart, data: () => ({ ...cart.data()}) } : cart
          )
        );
      });
    }
  };

  // const RemoveCart = (pid) => {
  //   firebase.handleRemove(pid).then(() => {
  //     setCarts((prevCarts) => prevCarts.filter((cart) => cart.data().id !== pid));
  //     console.log("Deleted");
  //   });
  // };

  const handleRemoveCart=(pid)=>{
    firebase.RemoveCart(pid);
  }

  const buyNow = async () => {
    if (!name || !address || !pincode || !phoneNumber) {
      return toast.error("All fields are required", { position: "top-center", autoClose: 1000, theme: "colored" });
    }

    const addressInfo = {
      name, address, pincode, phoneNumber,
      date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    };

    const options = {
      key: "rzp_test_SqgepgqkBSKKWq",
      key_secret: "KLbgJSDxUMo1c9zXl3Oo43JQ",
      amount: parseInt(total * 100),
      currency: "INR",
      order_receipt: `order_rcptid_${name}`,
      name: "Bookify",
      description: "for testing purpose",
      handler: function (response) {
        toast.success('Payment Successful');
        const paymentId = response.razorpay_payment_id;
        const orderInfo = { addressInfo, paymentId };
        firebase.carts.forEach((book) => firebase.placeOrder(params.bookId, 1, orderInfo));
      },
      theme: { color: "#3399cc" }
    };

    const pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <div>
      <Container >
        <div className="home">
        <div className="productContainer">
      <ListGroup style={{ width: '95%', margin: 'auto' }}>
        {firebase.carts.map((prod) => (
          <ListGroup.Item key={prod.data().id}>
            <Row className="align-items-center">
              <Col xs={12} md={3}>
                <span>{prod.data().name}</span>
              </Col>
              <Col xs={6} md={2}>₹ {prod.data().price}</Col>
              <Col xs={6} md={3}>
                <div className="quantity-box d-flex align-items-center justify-content-center">
                  <Button
                    variant="light"
                    onClick={() => cartProductDec(prod.data().id, prod.data().qty)}
                    disabled={prod.data().qty <= 1}
                  >
                    -
                  </Button>
                  <span className="mx-2">{prod.data().qty}</span>
                  <Button
                    variant="light"
                    onClick={() => cartProductIncrease(prod.data().id, prod.data().qty)}
                  >
                    +
                  </Button>
                </div>
              </Col>
              <Col xs={12} md={2} className="text-center mt-2 mt-md-0">
                <Button
                  variant="danger"
                  onClick={() => handleRemoveCart(prod.data().id)}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
          <div className="filters summary">
            <span className="title">Subtotal ({firebase.carts.length}) items</span>
            <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ₹ {total}</span>
            <Modal
              name={name}
              address={address}
              pincode={pincode}
              phoneNumber={phoneNumber}
              setName={setName}
              setAddress={setAddress}
              setPincode={setPincode}
              setPhoneNumber={setPhoneNumber}
              buyNow={buyNow}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Cartpage;
