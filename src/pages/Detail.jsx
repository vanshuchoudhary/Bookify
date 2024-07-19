import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import Modal from "./Modal.jsx"
import { toast } from 'react-toastify';
import "./detailc.css"
import Cartpage from "./Cart.jsx";
const BookDetailPage = () => {
  const params = useParams();
  const firebase = useFirebase();

  const [qty, setQty] = useState(1);
  // const [address,setAddress]=useState(); 


  const [data, setData] = useState(null);
  const [url, setURL] = useState(null);

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  const [name, setName] = useState("")
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2

  console.log(data);

  useEffect(() => {
    firebase.getBookById(params.bookId).then((value) => setData(value.data()));
  }, []);

  useEffect(() => {
    if (data) {
      const imageURL = data.imageURL;
      firebase.getImageURL(imageURL).then((url) => setURL(url));
    }
  }, [data]);

  // const buyNow = async () => {

    

  //   const result = await firebase.placeOrder(params.bookId, qty);
  //   console.log("Order Placed", result);
  //   // navigate()
  // };


  const buyNow = async () => {
    // validation 
    if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      )
    }
    console.log(addressInfo)

    var options = {
      key: "rzp_test_SqgepgqkBSKKWq",
      key_secret: "KLbgJSDxUMo1c9zXl3Oo43JQ",
      amount: parseInt(data.price* 100),
      currency: "INR",
      order_receipt: 'order_rcptid_' + name,
      name: "Bookify",
      description: "for testing purpose",
      handler: function (response) {

        // console.log(response)
        toast.success('Payment Successful')

        const paymentId = response.razorpay_payment_id
        // store in firebase 
        const orderInfo = {
          // cartItems,
          addressInfo,
          date: new Date().toLocaleString(
            "en-US",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }
          ),
          // email: JSON.parse(localStorage.getItem("user")).user.email,
          // userid: JSON.parse(localStorage.getItem("user")).user.uid,
          paymentId
        }

        try {
          // const result = addDoc(collection(fireDB, "orders"), orderInfo)
          const result =  firebase.placeOrder(params.bookId, qty,orderInfo);
        } catch (error) {
          console.log(error)
        }
      },

      theme: {
        color: "#3399cc"
      }
    };
    var pay = new window.Razorpay(options);
    pay.open();
    console.log(pay)
  }

  if (data == null) return <h1>Loading...</h1>;

  return (
    <div className="container mt-5">
      <h4>{data.name}</h4>
      <img src={url} width="20%" style={{ borderRadius: "10px" }} />
      <h5>Details</h5>
      <p>Price: Rs. {data.price * qty}</p>
      <p>ISBN Number. {data.isbn}</p>
      <h5>Owner Details</h5>
      <p>id: {firebase.user.uid}</p>
      <p>Email: {data.userEmail}</p>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Qty</Form.Label>
        <Form.Control
          onChange={(e) => setQty(e.target.value)}
          value={qty}
          type="Number"
          placeholder="Enter Qty"
          style={{ width: "65px" }}
          
        />
      </Form.Group>

      {/* <Form.Control
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          type="Address"
          placeholder="Enter address"
        /> */}

      {/* <Button onClick={placeOrder} variant="success">
        Buy Now
      </Button> */}
      <Modal name={name} address={address} pincode={pincode} phoneNumber={phoneNumber} setName={setName} setAddress={setAddress} setPincode={setPincode} setPhoneNumber={setPhoneNumber} buyNow={buyNow} />

      {/* <Cartpage buyNow={buyNow}/> */}
    </div>
  );
};

export default BookDetailPage;
