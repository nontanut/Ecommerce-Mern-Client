import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {DataContext} from "../../contexts/Context";
import "../../customs/CreateProduct.css";
import NotFound from "../utils/NotFound";

const initial = {
    product_id: "",
    title: "",
    price: 0,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
    category: "",
    _id: ""
}

const CreateProduct = () => {
    const state = useContext(DataContext);
    const [product, setProduct] = useState(initial);
    const [category] = state.category.category;
    const [images, setImages] = useState(false);
    const [loading, setLoading] = useState(false);
    const [admin] = state.user.admin;
    const [token] = state.token

    const navigate = useNavigate();
    const param = useParams();

    const [products] = state.getProducts.products;
    const [edit, setEdit] = useState(false);
    const [callData, setCallData] = state.getProducts.callData;
    // fetch data from id for edit
    useEffect(() => {
        if (param.id) {
            setEdit(true)
            products.forEach(product => {
                if (product._id === param.id) {
                    setProduct(product);
                    setImages(product.images);
                }
            })
        }else{
            setEdit(false);
            setProduct(initial);
            setImages(false);
        }
    }, [param.id, products])

    // upload images
    const handleUpload = async (e) => {
        e.preventDefault()
        try {
            // only admin can import file
            if (!admin) {
                return Swal.fire(
                    "Error",
                    "You're not admin!",
                    "error"
                )
            }
            const file = e.target.files[0]

            // must be import file before submit
            if (!file) {
                return Swal.fire(
                    "Must be import file.",
                    "File not exist.",
                    "error"
                )
            }

            // can't import file size more than 1mb
            if (file.size > 1024 * 1024) {
                return Swal.fire(
                    "Error",
                    "File size too large than 1mb!",
                    "error"
                )
            }

            // can import file type only jpeg/png/jpg
            if (file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "image/jpg") {
                return Swal.fire(
                    "File format is incorrect!",
                    "Sorry, you can import files only jpg/jpeg/png.",
                    "error"    
                )
            }

            let formData = new FormData();
            formData.append("file", file);

            setLoading(true)
            const res = await axios.post(`${process.env.REACT_APP_API}/api/upload`, formData, {
                headers: {"content-type": "multipart/form-data", Authorization: token}
            })

            setLoading(false);
            setImages(res.data);
        } catch (err) {
            Swal.fire(
                "Error",
                err.response.data.msg,
                "error"
            )
        }
    }

    // cancel image
    const handleDelete = async (e) => {
        try {
            if (!admin) {
                return Swal.fire(
                    "Error",
                    "You're not admin!",
                    "error"
                )
            }
            setLoading(true);
            // cancel image and delete in cloundinary
            await axios.post(`${process.env.REACT_APP_API}/api/img/delete`, {public_id: images.public_id}, {
                headers: {Authorization: token}
            })

            setLoading(false);
            setImages(false);
        } catch (err) {
            Swal.fire("Error", err.response.data.msg, "error")
        }
    }

    const handleChangeInput = e => {
        const {name, value} = e.target
        setProduct({...product, [name]:value})
    }

    // submit form
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!admin) {
                return Swal.fire(
                    "Error",
                    "You're not admin!",
                    "error"
                )
            }

            if (!images) {
                return Swal.fire(
                    "No Image Upload",
                    "Please upload your product image.",
                    "error"
                )
            }

            if (edit) {
                // edit
                await axios.put(`${process.env.REACT_APP_API}/api/product/update/${product._id}`, {...product, images}, {
                    headers: {Authorization: token}
                })
            }else{
                // create product
                await axios.post(`${process.env.REACT_APP_API}/api/create`, {...product, images}, {
                    headers: {Authorization: token}
                })
            }

            // fetch data after submit
            setCallData(!callData);
            // after submit redirect to shop page
            navigate("/");
        } catch (err) {
            Swal.fire("Error", err.response.data.msg, "error")
        }
    }

    const upload = {
        display: images ? "block" : "none"
    }

    return (
        <>
        {
            admin ? 
            <div className="w-100 d-flex flex-wrap align-items-center justify-content-around">
                <div className="w-100 border border-2 p-2 m-3" style={{maxWidth: "450px", height: "500px", position: "relative"}}>
                    <input 
                        type="file" 
                        name="file" 
                        id="file_up" 
                        onChange={handleUpload}
                    />
                    {
                        loading ? 
                        <div id="file_img">
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border text-danger text-center" style={{width: "20rem", height: "20rem"}} role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>

                        :<div id="file_img" style={upload}>
                            <img src={images ? images.url : ""} alt="" />
                            <span onClick={handleDelete}>X</span>
                        </div>
                    }
                </div>

                <form id="form" onSubmit={handleSubmit}>
                    <div id="row">
                        <label htmlFor="product_id">Product ID</label>
                        <input 
                            type="text" 
                            name="product_id" 
                            id="product_id"
                            value={product.product_id}
                            onChange={handleChangeInput}
                            placeholder="Example: id001, asdas, fghf2"
                            disabled={edit}
                            required
                        />
                    </div>

                    <div id="row">
                        <label htmlFor="title">Title</label>
                        <input 
                            type="text" 
                            name="title" 
                            id="title"
                            value={product.title}
                            onChange={handleChangeInput}
                            required
                        />
                    </div>

                    <div id="row">
                        <label htmlFor="price">Price <span>$</span></label>
                        <input 
                            type="number" 
                            name="price" 
                            id="price"
                            value={product.price}
                            onChange={handleChangeInput}
                            required
                        />
                    </div>

                    <div id="row">
                        <label htmlFor="description">Description</label>
                        <textarea 
                            rows="5"
                            type="text" 
                            name="description" 
                            id="description"
                            value={product.description}
                            onChange={handleChangeInput}
                            required
                        />
                    </div>

                    <div id="row">
                        <label htmlFor="content">Content</label>
                        <textarea 
                            rows="7"
                            type="text" 
                            name="content" 
                            id="content"
                            value={product.content}
                            onChange={handleChangeInput}
                            required
                        />
                    </div>

                    <div id="row">
                        <label htmlFor="category" className="me-2">Category</label>
                        <select type="text" name="category" value={product.category} onChange={handleChangeInput}>
                            <option value="">Please select a category.</option>
                            {
                                category.map(category => (
                                    <option value={category._id} key={category._id}>
                                        {category.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <button type="submit" className="btn fw-bold text-uppercase text-white" style={{width: "200px", height: "40px", background: "#ED872D", letterSpacing: "2px"}}>{edit? "Update" : "Create"}</button>
                </form>
            </div> : <NotFound />
        }
        </>
    )
}

export default CreateProduct;