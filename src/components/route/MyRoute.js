import { Routes, Route } from "react-router-dom";
import Products from "../products/Products";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Cart from "../cart/Cart";
import NotFound from "../utils/NotFound";
import DetailProduct from "../products/DetailProduct";
import History from "../historys/Order";
import OrderDetails from "../historys/OrderDetails";
import Categories from "../category/Category";
// import Home from "../main/Home";
import CreateProduct from "../createProduct/CreateProduct";

const MyRoute = () => {
    return (
        <Routes>
            {/* <Route path="/" exact element={<Home/>} /> */}
            <Route path="/" element={<Products/>} />

            <Route path="/create" element={<CreateProduct/>} />
            <Route path="/product/update/:id" element={<CreateProduct/>} />
            
            <Route path="/detail/:id" element={<DetailProduct/>} />

            <Route path="/api/login" element={<Login/>} />
            <Route path="/api/register" element={<Register/>} />

            <Route path="/category" element={<Categories/>} />

            <Route path="/history" element={<History/>} />
            <Route path="/history/:id" element={<OrderDetails/>} />

            <Route path="/cart" element={<Cart/>} />

            <Route path="*" element={<NotFound/>} />
        </Routes>
    )
};

export default MyRoute;