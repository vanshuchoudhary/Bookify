import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  

  apiKey: "AIzaSyD_2WvRjKjAjsqCuaqOLPrOvvrqsC6gHBw",
  authDomain: "bookstore-24749.firebaseapp.com",
  projectId: "bookstore-24749",
  storageBucket: "bookstore-24749.appspot.com",
  messagingSenderId: "534248143393",
  appId: "1:534248143393:web:a4c0061ba47314fe878160",
  measurementId: "G-KTKGLSKJGJ"
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const singinUserWithEmailAndPass = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

    const logout1=()=>
       signOut(firebaseAuth);
    

  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

  const handleCreateNewListing = async (name, isbn, price, cover) => {
    const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
    const uploadResult = await uploadBytes(imageRef, cover);
    return await addDoc(collection(firestore, "books"), {
      name,
      isbn,
      price,
      imageURL: uploadResult.ref.fullPath,
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };

  const listAllBooks = () => {
    
    return getDocs(collection(firestore, "books"));
  };

  const listAllcarts = async() => {
    console.log("hello nocart")

    if(!user)
    {
      return null;
    }
    console.log("hello cart")
     const result= await getDocs(collection(firestore, "cart"+user.uid));
     return result;
    
   
   
}

const cartUpdate=async(pid,qtyn)=>
{
  if(!user)
  {
    return null;
  }

  const collectionRef = collection(firestore, "cart"+user.uid);
  const q = query(collectionRef, where("id", "==", pid));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (doc) => {
    // Get the document reference
    const docRef = doc.ref;
    
    getDoc(docRef).then((docSnapshot) => {
      if (docSnapshot.exists) {
        // Access the data of the document using .data() method
        const data = docSnapshot.data();
        console.log("Document data:", data);
    
        // Update the specific field in the documen
        return updateDoc(docRef, { qty: qtyn })
      } else {
        console.log("Document does not exist!");
        // Handle document does not exist case if needed
        return Promise.reject(new Error("Document does not exist!"));
      }
    })
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch((error) => {
      console.error("Error updating document:", error);
    });


    // try {
    //     // Delete the document
    //     await updateDoc(docRef);
    //     console.log("Document successfully deleted");
    // } catch (error) {
    //     console.error("Error deleting document: ", error);
    // }
});
}

const handleRemove= async(pid)=>{
  if(!user)
  {
    return null;
  }
  const collectionRef = collection(firestore, "cart"+user.uid);
    const q = query(collectionRef, where("id", "==", pid));
    const querySnapshot = await getDocs(q);
  

    querySnapshot.forEach(async (doc) => {
      // Get the document reference
      const docRef = doc.ref;

      try {
          // Delete the document
          await deleteDoc(docRef);
          console.log("Document successfully deleted");
      } catch (error) {
          console.error("Error deleting document: ", error);
      }
  });
   
}
  

//   const listAllcarts = async () => {
//     const querySnapshot = await getDocs(collection(firestore, "cart" + user.uid));
//     const cartItems = [];
//     querySnapshot.forEach((doc) => {
//         const item = doc.data();
//         // Assuming your document structure contains name, isbn, price, id, userID, and buyer
//         cartItems.push({
//             name: item.name,
//             isbn: item.isbn,
//             price: item.price,
//             id: item.id,
//             userID: item.userID,
//             buyer: item.buyer
//         });
//     });
//     return cartItems;
// };
const [carts, setCarts] = useState([]);

const RemoveCart = (pid) => {
  handleRemove(pid).then(() => {
    setCarts((prevCarts) => prevCarts.filter((cart) => cart.data().id !== pid));
    console.log("Deleted");
  });
};





  const AddToCart=async(name, isbn, price,id,qty)=>{
    return await addDoc(collection(firestore,"cart"+user.uid),{
      name,
      isbn,
      price,
      id,
      userID: user.uid,
      buyer: user.email,
      qty,
    });
    console.log("sucessfully added to cart")

  };
  

  const getBookById = async (id) => {
    const docRef = doc(firestore, "books", id);
    const result = await getDoc(docRef);
    return result;
  };

  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  const placeOrder = async (bookId, qty,orderInfo) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const result = await addDoc(collectionRef, {
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      qty: Number(qty),
      order_Info:orderInfo,
    });
    return result;
  };

  const fetchMyBooks = async (userId) => {
    const collectionRef = collection(firestore, "books");
    const q = query(collectionRef, where("userID", "==", userId));

    const result = await getDocs(q);
    return result;
  };

  const getOrders = async (bookId) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const result = await getDocs(collectionRef);
    return result;
  };


  const isBookInCart = async (bookId) => {
    if (!user) return false;
    const collectionRef = collection(firestore, `cart${user.uid}`);
    const q = query(collectionRef, where("id", "==", bookId));
    const result = await getDocs(q);
    return !result.empty;
  };
  
  
  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        signinWithGoogle,
        signupUserWithEmailAndPassword,
        singinUserWithEmailAndPass,
        handleCreateNewListing,
        listAllBooks,
        getImageURL,
        logout1,
        getBookById,
        placeOrder,
        fetchMyBooks,
        getOrders,
        isLoggedIn,
        user,
        AddToCart,
        firestore,
        listAllcarts,
        handleRemove,
        cartUpdate,
        carts,
        RemoveCart,
        setCarts,
        isBookInCart
        
        
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
