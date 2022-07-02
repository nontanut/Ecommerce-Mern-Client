import {useContext, useEffect, useState} from "react";
import {DataContext} from "../../contexts/Context"
import Swal from "sweetalert2";
import axios from "axios";
import PaypalButton from "./PaypalButton";

const Cart = () => {
    const product = useContext(DataContext);
    const [cart, setCart] = product.user.cart;
    const [total, setTotal] = useState(0);
    const [token] = product.token;

    // calculate every times if cart change
    useEffect(() => {
        const count = () => {
            const total = cart.reduce((prev, item) => {
                // calculate per item
                return prev + (item.price * item.quantity)
            }, 0)
            setTotal(total);
        }

        count()

    }, [cart]);

    // add item to cart
    const addToCart = async (cart) => {
        await axios.patch(`${process.env.REACT_APP_API}/api/addcart`, {cart}, {
            headers: {Authorization: token}
        })
    }

    // add product
    const increase = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity += 1
            }
        })
        setCart([...cart]);
        addToCart(cart);
    }

    // delete product
    // const removeProduct = id => {
    //     if (window.confirm("Do you want to delete this product?")) {
    //         cart.forEach((item, index) => {
    //             if (item._id === id) {
    //                 cart.splice(index, 1)
    //             }
    //         })
    //         setCart([...cart])
    //     }
    // }

    // delete product
    const removeProduct = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this product?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0d6efd",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                cart.forEach((item, index) => {
                    if (item._id === id) {
                        cart.splice(index, 1)
                    }
                })
                setCart([...cart])
                addToCart(cart);
                Swal.fire(
                    "Deleted!",
                    "Your product has been deleted.",
                    "success"
                )
            }
        })
        }

    // decrease product
    const decrease = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                // if item < 1 ask for delete
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })
        setCart([...cart])
        addToCart(cart);
    }
    // if done process for buy item
    const tranSuccess = async (payment) => {
        const {paymentID, address} = payment;

        await axios.post(`${process.env.REACT_APP_API}/api/payment/create`, {cart, paymentID, address}, {
            headers: {Authorization: token}
        })

        setCart([]);
        addToCart([]);
        // after success show confirm
        Swal.fire(
            "Thank you.",
            "You have successfully to buy item.",
            "success"
            )
    }

    // Emtry cart
    if (cart.length === 0) {
        return (
            <>
                <h1 className="text-center m-5 fw-bold">Cart Emtry</h1>
                <div className="text-center text-danger">
                    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill="currentColor" class="bi bi-cart-x" viewBox="0 0 16 16">
                        <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793 7.354 5.646z"/>
                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                </div>
            </>
        )
    }

    // format number
    const formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    }

    return (
        <div className="pb-5">
            {
                cart.map(product => (
                    <div className="container mt-3" style={{width: "100%"}} key={product._id}>
                        
                        <div className="row g-0 justify-content-center border m-3 p-3">
                            
                            <img src={product.images.url} alt="" className="col-lg-6 order-lg-1" style={{maxWidth: "400px", width: "100%", height: "300px"}}/>

                            <div className="card col-lg-6 order-lg-2 text-capitalize ms-3 border-0 my-auto" style={{maxWidth: "400px", width: "100%"}}>
                                
                                <h2 className="card-title text-danger fw-bold">{product.title}</h2>

                                <p className="card-text text-success">$ {formatNumber(Math.abs(product.price * product.quantity))}</p>
                                <span className="card-text fw-bold">{product.description}</span>
                                <p className="card-text">{product.content.substring(0, 150) + "..."}</p>

                                <div>
                                    <span className="me-2" type="button" onClick={() => decrease(product._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-dash-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm2.5 7.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1z"/>
                                        </svg>    
                                    </span>

                                    <span className="fw-bold text-danger">{product.quantity}</span>

                                    <span className="ms-2" type="button" onClick={() => increase(product._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                    </span>

                                    <span 
                                        className="ms-2 text-danger" type="button"
                                        style={{cursor: "pointer"}}
                                        onClick={() => removeProduct(product._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                        </svg>
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>
                ))
            }
            <div className="container d-flex text-center justify-content-between">
                <h5 className="ms-4 fw-bold text-danger">Total: $ {formatNumber(Math.abs(total))}</h5>
                <PaypalButton 
                    total = {total}
                    tranSuccess = {tranSuccess}
                />
            </div>
        </div>
    )
}

export default Cart;