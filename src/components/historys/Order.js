import { useContext, useEffect } from "react";
import { DataContext } from "../../contexts/Context";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../service/authorize";
import axios from "axios";

const OrderHistory = () => {
    const navigate = useNavigate();

    const state = useContext(DataContext);
    const [history, setHistory] = state.user.history;
    const [admin] = state.user.admin;
    const [token] = state.token;

    // redirect path to login if not login
    useEffect(() => {
        !getToken() && navigate("/api/login")
    })

    useEffect(() => {
        if (token) {
            const getHistory = async () => {
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
    }, [token, admin, setHistory])

    return (
        <div className="mx-auto m-5 text-center w-100">
            <h3 className="fw-bold text-uppercase">History</h3>

            <h6 className="text-uppercase ">You have {history.length} ordered</h6>

            <div className="mx-5" style={{overflowX: "auto"}}>
                <table className="w-100 border">
                    <thead>
                        <tr className="border border-1">
                            <th className="p-1 border border-1">Payment ID</th>
                            <th className="p-1 border border-1">Date of Purchased</th>
                            <th className="p-1 border border-1"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            history.map(item => (
                                <tr key = {item._id} className="border border-1">
                                    <td className="p-1 border border-1">{item.paymentID}</td>
                                    <td className="p-1 border border-1">{new Date(item.createdAt).toLocaleDateString()}</td>
                                    <td className="p-1 border border-1"><Link to={`/history/${item._id}`}>View</Link></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderHistory;