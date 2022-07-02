import { useContext, useState } from "react";
import { DataContext } from "../../contexts/Context";
import ProductItem from "../utils/ProductItem";
import axios from "axios";
import Swal from "sweetalert2";
import Filter from "./Filter";
import LoadMore from "./LoadMore";
import BackToTop from "../main/BackToTop";
import Slide from "../main/Slide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faCopyright } from "@fortawesome/free-solid-svg-icons";

const Products = () => {
    const getAll = useContext(DataContext);
    const [products, setProducts] = getAll.getProducts.products;
    const [admin] = getAll.user.admin;
    const [token] = getAll.token;
    const [callData, setCallData] = getAll.getProducts.callData;
    const [check, setCheck] = useState(false);

    // checkbox
    const handleCheck = id => {
        products.forEach(product => {
            if (product._id === id) {
                product.checked = !product.checked
            }
        })
        setProducts([...products])
    }

    // checked all product
    const checkedAll = () => {
        products.forEach(product => {
            // checked must be true
            product.checked = !check
        })
        setProducts([...products]);
        // reset check
        setCheck(!check);
    }

    // confirm delete
    const confirmDelete = (id, public_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this category?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0d6efd",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            // ask for delete
            if (result.isConfirmed) {
                handleDelete(id, public_id);
            }
        })
    }

    // delete from select by check box
    const deleteAll = () => {
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
                products.forEach(product => {
                    if (product.checked) {
                        handleDelete(product._id, product.images.public_id)
                    }
                    Swal.fire(
                        "Success",
                        "Deleted",
                        "success"
                    )
                })
            }
        })
    }
    
    // delete product
    const handleDelete = async (id, public_id) => {
        try {
            // delete image
            const deleteImage = axios.post(`${process.env.REACT_APP_API}/api/img/delete`, {public_id}, {
                headers: {Authorization: token}
            })

            // delete product
            const deleteProduct = axios.delete(`${process.env.REACT_APP_API}/api/product/delete/${id}`, {
                headers: {Authorization: token}
            })

            Swal.fire(
                "Success",
                "Delete Success",
                "success"
            )

            await deleteImage;
            await deleteProduct;
            // fetch data after delete
            setCallData(!callData);
        } catch (err) {
            Swal.fire("Error", err.response.data.msg, "error")
        }
    }

    // console.log(getAll)
    return (
        <>
        <Slide />
        <Filter />
        {
            admin &&
            <div className="text-end m-3" id="selectAll">
                <span 
                    className="text-uppercase text-secondary fw-bold" 
                    onClick={checkedAll}
                    style={{cursor: "pointer", letterSpacing: "1.2px", fontSize: "14px"}}>Select All
                </span>
                <input 
                    style={{height: "25px", width: "25px", margin: "0 15px", transform: "translateY(5px)"}}
                    type="checkbox" 
                    checked={check} 
                    onChange={checkedAll} 
                />
                <span 
                    className="text-uppercase text-danger fw-bold" 
                    style={{cursor: "pointer", letterSpacing: "1.2px", fontSize: "14px"}}
                    onClick={deleteAll}>
                    Delete
                </span>
            </div>
        }
        <div 
            className="d-grid m-4" 
            style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))",
                justifyItems: "center"
            }}
        >
            {
                // show data
                products.map(product => {
                    return <ProductItem 
                        key={product._id} 
                        product={product} 
                        admin={admin}
                        handleDelete={confirmDelete}
                        handleCheck={handleCheck}
                    />
                })
            }
        </div>
        
        {/* Load more data */}
        <LoadMore />
        {/* Arrow back to top */}
        <BackToTop />

        {/* footer */}
        <footer className="footer p-3 text-center" style={{background: "#ed872d"}}>
            <div className="container">
                <p className="fw-bold text-light m-0 p-0">Copyright 2022 <span><FontAwesomeIcon icon={faCopyright} /></span> AW Shop || <span><FontAwesomeIcon icon={faPhone} /> 02-4689695</span></p>
                {/* <p className="fw-bold text-light m-0 p-0"><FontAwesomeIcon icon={faPhone} /> 02-4689695</p> */}
            </div>
        </footer>
        </>
    )
}

export default Products;