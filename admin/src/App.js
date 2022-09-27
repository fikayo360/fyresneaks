
import AddProduct from "./pages/addproduct";
import Home from "./pages/adminhome";
import Login from "./pages/login";
import Orders from "./pages/orders";
import Products from "./pages/products";
import { BrowserRouter as Router,Route,Routes,Navigate} from "react-router-dom";
import Editusers from "./pages/editusers";
import Updateproduct from "./pages/updateproduct";
import Orderdetail from "./pages/orderItem";
import { useSelector } from "react-redux";


function App() {
  const user = useSelector((state) => state.user)
  return (
    <div className="App">
      <Router>
        <Routes> 
        <Route index element={ <Login/> } />
        <Route path="adminhome" element={<Home/>} /> 
        <Route path="edituser/:id" element={<Editusers/>} />
        <Route path="products" element={<Products/>} />
        <Route path="addproduct" element={<AddProduct/>} />
        <Route path="updateproduct/:id" element={<Updateproduct/>} />
        <Route path="orders" element={<Orders/>} />
        <Route path="orders/:id" element={<Orderdetail/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
