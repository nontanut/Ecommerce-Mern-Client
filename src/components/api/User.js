import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

const User = (token) => {
    const [user, setUser] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [cart, setCart] = useState([]);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    // fetch user data
                    const res = await axios.get(`${process.env.REACT_APP_API}/api/user/infor`, {
                        headers: {Authorization: token}
                    })
                    setUser(true)
                    // role 1 = admin
                    res.data.role === 1 ? setAdmin(true) : setAdmin(false)

                    setCart(res.data.cart)
                } catch (err) {
                    console.log(err.response.data.msg)
                }
            }

            getUser()
        }
    }, [token])

    useEffect(() => {
        if(token) {
            const getHistory = async() => {
                if (admin) {
                    const res = await axios.get(`${process.env.REACT_APP_API}/api/payment`, {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)
                }else{
                    const res = await axios.get(`${process.env.REACT_APP_API}/api/history`, {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)
                }
            }
            getHistory()
        }
    }, [token, admin])

    // Cart if no token login first
    const addCart = async (product) => {
        if (!user) {
            return (
                Swal.fire (
                    "Error",
                    "Please login before buy any item.",
                    "error"
                )
            )
        }

        const check = cart.every(item => {
            return item._id !== product._id
        })

        // if cart item._id not equal product._id. so can add item to cart
        if (check) {
            setCart([...cart, {...product, quantity: 1}])

            await axios.patch(`${process.env.REACT_APP_API}/api/addCart`, {cart: [...cart, {...product, quantity: 1}]}, {
                headers: {Authorization: token}
            })
        } else {
            Swal.fire (
                "Error",
                "This product has been added to cart.",
                "error"
            )
        }
    }

    return {
        admin: [admin],
        addCart: addCart,
        cart: [cart, setCart],
        history: [history, setHistory],
    }
}

export default User;