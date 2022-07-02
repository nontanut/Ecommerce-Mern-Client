import { useContext, useEffect, useState } from "react";
import {useParams, Link} from "react-router-dom";
import {DataContext} from "../../contexts/Context";
import ProductItem from "../utils/ProductItem";

const DetailProduct = () => {
    // get id
    const params = useParams()

    const detail = useContext(DataContext)
    const [admin] = detail.user.admin;

    const [products] = detail.getProducts.products;
    const addCart = detail.user.addCart;
    const [detailProduct, setDetailProduct] = useState([]);

    // fetch all data matched = params.id === product._id
    useEffect(() => {
        if (params.id) {
            products.forEach(product => {
                if (product._id === params.id) {
                    setDetailProduct(product)
                }
            })
        }
    }, [params.id, products])

    if (detailProduct.length === 0) {
        return null
    }

    // format number
    const formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    }
    return (
        <>
            <div id="detail_page" className="container mt-5 p-0" style={{width: "100%"}}>
                <div className="row g-0 justify-content-center d-flex flex-wrap">
                    <img src={detailProduct.images.url} alt="" className="col-lg-6 order-lg-1" style={{maxWidth: "500px", width: "100%" ,height: "430px", objectFit: "cover"}}/>
                    <div id="content" className="card col-lg-6 order-lg-2 text-capitalize ms-3 border-0 my-auto" style={{maxWidth: "500px", width: "100%",maxHeight: "450px", textAlign: "justify"}}>
                        <div className="justify-content-between d-flex">
                            <h2 className="card-title text-danger fw-bold">{detailProduct.title}</h2>
                            <p className="text-muted m-0 align-self-center">#id: {detailProduct.product_id}</p>
                        </div>
                        <p className="card-text text-success">$ {formatNumber(Math.abs(detailProduct.price))}</p>
                        <span className="card-text fw-bold pb-2">{detailProduct.description}</span>
                        <p className="card-text" style={{textIndent: "10%"}}>{detailProduct.content}</p>
                        <p className="card-text text-muted">Sold: {detailProduct.sold}</p>
                        {admin ? "" :
                            <Link to="/cart">
                                <button 
                                    id="btn_buyNow"
                                    className="btn btn-danger w-auto" 
                                    onClick={() => addCart(detailProduct)}
                                    >Buy Now
                                </button>
                            </Link>
                        }
                    </div>
                </div>
            </div>

            {/* fetch data from category to show in Realate */}
            <div className="mt-5 container" id="related">
                <h3 className="fw-bold ms-5">Related Products</h3>
                <div 
                    id="related_products"
                    className="d-grid m-4" 
                    style={{
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))",
                        justifyItems: "center"
                    }}
                >
                    {
                        products.map(product => {
                            return product.category === detailProduct.category ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailProduct;