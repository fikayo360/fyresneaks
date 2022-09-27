
import Home from './pages/home';
import Signup from './pages/register';
 import Login from './pages/login';
import Product from './pages/product';
import ProductsPage from './pages/productsPage';
import Cart from './pages/cart';
import { BrowserRouter as Router,Route,Routes,Navigate} from "react-router-dom";
import Pay from './pages/pay';
import "./index.css"
import {useSelector } from "react-redux";


function App() {
  const user = useSelector((state) => state.user.emailaddress)
  return (
    <div className="App"> 
     <Router>
      <Routes>
        <Route index element={<Login/>} />
        <Route path="register" element={<Signup/>} />
        <Route path="home" element={
         !user ? (
          <Navigate replace to="/" />
        ): (
          <Home />
           )
        } 
        />
        <Route path="product/:id" element={<Product/>} />
        <Route path="productsPage/:category" element={<ProductsPage/>} />
        <Route path="cart" element={
             !user ? (
              <Navigate replace to="/" />
             ):(
              <Cart/>
           )
        } />

        <Route path="pay" element={
         !user ? (
          <Navigate replace to="/" />
         ):(
          <Pay/>
       )
        } />
        
      </Routes>
    </Router>
    </div>
  );
}

export default App;
