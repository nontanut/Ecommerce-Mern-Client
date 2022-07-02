import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { authenticate } from "../service/authorize";
import { getToken } from "../service/authorize";

const Register = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    // 2 function
    const onChangeHandle = name => e => {
        setUser({...user, [name]:e.target.value})
    }

    // submit form
    const onSubmit = e => {
        e.preventDefault();
        axios
        .post(`${process.env.REACT_APP_API}/api/register`, {...user})
        .then(response => {
            authenticate(response, () => navigate("/"));
        }).catch(err => {
            Swal.fire(
                "Error", // title
                err.response.data.msg,
                "error" // format
            )
        })
    }

    // debug path ไม่ให้เข้า path register ได้อีกหากเข้าสู่ระบบแล้ว
    useEffect(() => {
        getToken() && navigate("/");
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container mt-5 border border-dark p-3" style={{maxWidth: "450px"}}>
            <h1 className="text-center">Register</h1>
            <form onSubmit={onSubmit}>
                <input 
                    name="name"
                    type="text"
                    placeholder="Name" 
                    value={user.name} 
                    required
                    onChange={onChangeHandle("name")}
                    className="form-control mb-2"
                />
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
                <input 
                    name="confirmPassword"
                    type="password" 
                    placeholder="Confirm Password" 
                    value={user.confirmPassword} 
                    required
                    onChange={onChangeHandle("confirmPassword")}
                    className="form-control mb-2"
                />

                <div>
                    <button type="submit" className="btn btn-danger me-1 me-md-2" style={{width: "49%"}}>Register</button>
                    <Link to="/api/login">
                        <button className="btn btn-secondary" style={{width: "49%"}}>Login</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Register;