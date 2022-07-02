import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../contexts/Context";

const OrderDetails = () => {
    const order = useContext(DataContext);
    const [history] = order.user.history;
    const [orderDetails, setOrderDetails] = useState([]);

    const params = useParams();

    useEffect(() => {
        if(params.id) {
            history.forEach(item => {
                if(item._id === params.id) setOrderDetails(item)
            })
        }
    }, [params.id, history]);

    if (orderDetails.length === 0) {
        return null;
    }
    return (
        <div className="text-center mx-5 mt-5">
            <table className="w-100 border">
                <thead>
                    <tr className="border border-1">
                        <th className="p-1 border border-1">Name</th>
                        <th className="p-1 border border-1">Address</th>
                        <th className="p-1 border border-1">Postal Code</th>
                        <th className="p-1 border border-1">Country Code</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-1 border border-1">{orderDetails.address.recipient_name}</td>
                        <td className="p-1 border border-1">{orderDetails.address.line1 + " - " + orderDetails.address.city}</td>
                        <td className="p-1 border border-1">{orderDetails.address.postal_code}</td>
                        <td className="p-1 border border-1">{orderDetails.address.country_code}</td>
                    </tr>
                </tbody>
            </table>

            <table className="w-100 border mt-5">
                <thead>
                    <tr className="border border-1">
                        <th className="p-1 border border-1"></th>
                        <th className="p-1 border border-1">Product</th>
                        <th className="p-1 border border-1">Quantity</th>
                        <th className="p-1 border border-1">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderDetails.cart.map(item => (
                            <tr key = {item._id}>
                                <td className="p-1 border border-1"><img src={item.images.url} alt="" style={{width: "70px", height: "100px", objectFit: "cover"}}/></td>
                                <td className="p-1 border border-1 text-capitalize">{item.title}</td>
                                <td className="p-1 border border-1">{item.quantity}</td>
                                <td className="p-1 border border-1">$ {item.price * item.quantity}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrderDetails;