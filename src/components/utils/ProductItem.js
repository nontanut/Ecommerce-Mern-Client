import { useContext } from "react";
import {Link} from "react-router-dom";
import { DataContext } from "../../contexts/Context";
import "../../customs/ProductItem.css";
import renderHTML from "react-render-html";

const ProductItem = ({product, admin, handleDelete, handleCheck}) => {
    const state = useContext(DataContext);
    const addCart = state.user.addCart

    // restructure
    const {_id, title, description, images, price} = product;

    const formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    }
    return (
            <div className="card rounded-md p-3 shadow mb-4">
                {
                    admin && <input 
                    id="checkboxAdmin" 
                    className="position-absolute top-25 start-25" 
                    type="checkbox" 
                    checked={product.checked} 
                    onChange={() => handleCheck(product._id)}
                    />
                }
                <Link to={`/detail/${_id}`}>
                    <img src={images.url} alt="" className="card-img-top" />
                </Link>
                <div className="card-body rounded p-0">
                    <Link to={`/detail/${_id}`} className="text-decoration-none text-black">
                        <h2 className="card-title text-capitalize fw-bold" title={title}>{title}</h2>
                    </Link>
                    <span className="card-text text-danger">$ {formatNumber(Math.abs(price))}</span>
                    {/* render text only 0-100 */}
                    <p className="card-text text-wrap">{renderHTML(description.substring(0,75) + "...")}</p>
                    {admin ?
                        <div className="btn-link">
                            {/* delete product id and image id */}
                            <Link className="btn btn-danger me-1 fw-bold" to="" id="card-desc" onClick={() => handleDelete(product._id, product.images.public_id)}>
                                Delete
                            </Link>
                            <Link className="btn btn-secondary fw-bold" to={`/product/update/${_id}`}>
                                Edit
                            </Link>
                        </div>
                        :
                        <div className="btn-link">
                            <Link className="btn btn-danger me-1 fw-bold" to="" id="card-desc" onClick={() => addCart(product)}>
                                Buy
                            </Link>
                            <Link className="btn btn-secondary fw-bold" to={`/detail/${_id}`}>
                                View
                            </Link>
                        </div>
                    }
                </div>
            </div>
    )
}

export default ProductItem;