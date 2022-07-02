import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { authenticate, getToken } from "../service/authorize";

const Login = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    // 2 function
    const onChangeHandle = name => e => {
        setUser({...user, [name]:e.target.value})
    }

    // submit form
    const onSubmit = e => {
        e.preventDefault();
        axios
        .post(`${process.env.REACT_APP_API}/api/login`, {...user})
        .then(response => {
            // force reload after login
            window.location.reload()
            authenticate(response, () => navigate("/"));
        }).catch(err => {
            Swal.fire(
                "Error", // title
                err.response.data.msg,
                "error" // format
            )
        })
    }

    // debug path ไม่ให้เข้า path login ได้อีกหากเข้าสู่ระบบแล้ว
    useEffect(() => {
        getToken() && navigate("/");
        // eslint-disable-next-line
    }, [])

    return (
        <div id="login" className="container mt-5 border border-dark p-3" style={{maxWidth: "450px"}}>
            <h1 className="text-center">Login</h1>
            <form onSubmit={onSubmit}>
                <input 
                    name="email"
                    type="email"
                    placeholder="E-mail" 
                    value={user.email} 
                    required
                    onChange={onChangeHandle("email")}
                    className="form-control mb-2"
                />
                <input 
                    name="password"
                    type="password" 
                    placeholder="Password" 
                    value={user.password} 
                    required
                    onChange={onChangeHandle("password")}
                    className="form-control mb-2"
                />

                <div>
                    <button type="submit" className="btn btn-danger me-1 me-md-2" style={{width: "49%"}}>Login</button>
                    <Link to="/api/register">
                        <button className="btn btn-secondary" style={{width: "49%"}}>Register</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Login;