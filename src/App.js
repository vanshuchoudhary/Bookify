import { Routes, Route ,useLocation} from "react-router-dom";

// Components
import MyNavbar from "./components/Navbar";

// Pages
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ListingPage from "./pages/List";
import HomePage from "./pages/Home";
import BookDetailPage from "./pages/Detail";
import OrdersPage from "./pages/ViewOrder";
import ViewOrderDetails from "./pages/ViewOrderDetail";
import Logout from "./pages/Logout";
import Cartpage from "./pages/Cart";
// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { useFirebase } from "./context/Firebase";

function App() {

  const firebase=useFirebase();
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register'];

  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  
  return (

    <div className="background">
      
    
       {!shouldHideNavbar  && <MyNavbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/book/list" element={<ListingPage />} />
        <Route path="/book/view/:bookId" element={<BookDetailPage />} />
        <Route path="/book/orders" element={<OrdersPage />} />
        <Route path="/books/orders/:bookId" element={<ViewOrderDetails />} />
        <Route path="/book/cart" element={<Cartpage />} />
      </Routes>
      {/* <Logout/> */}
    </div>
  );
}

export default App;
