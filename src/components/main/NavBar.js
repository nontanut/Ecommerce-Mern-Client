import { useContext } from "react";
import {Link, useNavigate} from "react-router-dom";
import { DataContext } from "../../contexts/Context";
import "../../customs/NavBar.css";
import { getToken, logout } from "../service/authorize";

const Navbar = () => {
    const userData = useContext(DataContext);
    const [admin] = userData.user.admin
    const [cart] = userData.user.cart

    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg navbar-light fw-bold" id="bg-color">
            <div className="container">
                <Link to="/" className="navbar-brand text-white">AW Shop</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navBarToggler">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navBarToggler">
                    <ul className="navbar-nav align-items-center">
                        {/* <li className="nav-item">
                            <Link to="/" className="nav-link">HOME</Link>
                        </li> */}
                        <li className="nav-item">
                            <Link to="/" className="nav-link">{admin ? "PRODUCTS" : "SHOP"}</Link>
                        </li>
                        {
                            admin ?
                            <>
                                <li className="nav-item">
                                    <Link to="/create" className="nav-link">CREATE PRODUCT</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/category" className="nav-link">CATEGORIES</Link>
                                </li>
                            </>: ""
                        }
                        {!getToken() ?
                            <li className="nav-item">
                                <Link to="/api/login" className="nav-link">LOGIN</Link>
                            </li> :
                            <>
                                <li className="nav-item">
                                    <Link to="/history" className="nav-link">HISTORY</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="" className="nav-link" onClick={() => logout(() => window.location.reload(navigate("/")))}>LOGOUT</Link>
                                </li>
                            </>
                        }

                        {admin ? "" :
                            <li className="nav-item" id="cart-icon">
                                <span>{cart.length}</span>
                                <Link to="/cart" className="nav-link">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                    </svg>
                                </Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;