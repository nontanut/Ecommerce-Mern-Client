import axios from "axios";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { DataContext } from "../../contexts/Context";
import NotFound from "../utils/NotFound";

const Categories = () => {
    const state = useContext(DataContext);
    const [categories] = state.category.category;
    const [category, setCategory] = useState("");
    const [admin] = state.user.admin;
    const [token] = state.token;
    const [callback, setCallback] = state.category.callback;
    const [edit, setEdit] = useState(false);
    const [id, setID] = useState("");

    // create category
    const createCategory = async e => {
        e.preventDefault()
        try {
            // edit
            if (edit) {
                const res = await axios.put(`${process.env.REACT_APP_API}/api/category/update/${id}`, {name: category}, {
                    headers: {Authorization: token}
                })

                Swal.fire(
                    "Update Category Success",
                    res.data.msg,
                    "success"
                )
            }else{
                // create
                const res = await axios.post(`${process.env.REACT_APP_API}/api/category/create`, {name: category}, {
                    headers: {Authorization: token}
                })
    
                Swal.fire(
                    "Create Success",
                    res.data.msg,
                    "success"
                )
            }
            setEdit(false);
            // null after careted
            setCategory("");
            // show value from create
            setCallback(!callback);
        } catch (err) {
            Swal.fire(
                "Something went wrong",
                err.response.data.msg,
                "error"
            )
        }
    }

    // Edit category
    const editCategory = async (id, name) => {
        setID(id); // id category
        setCategory(name) // show name for edit on input
        setEdit(true); // can edit and save
    }

    // confirm delete category
    const confirmDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this category?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0d6efd",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            // ask for delete?
            if (result.isConfirmed) {
                deleteCategory(id);
            }
        })
    }

    // Delete category
    const deleteCategory = async (id) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API}/api/category/delete/${id}`, {
                headers: {Authorization: token}
            })
            
            Swal.fire(
                "Success",
                res.data.msg,
                "success"
            );
            setCallback(!callback) // fecth data after deleted
        } catch (err) {
            Swal.fire(
                "Error",
                err.response.data.msg,
                "error"    
            )
        }
    }

    return (
        <>
        {/* only admin can create category */}
        {
            admin ?
                <div id="category" className="d-flex flex-warp justify-content-around mx-auto mt-5" style={{maxWidth: "700px"}}>
                    <form id="form_cate" onSubmit={createCategory} className="mb-2" style={{width: "290px"}}>
                        <label htmlFor="category" className="d-block text-uppercase mb-2" style={{fontWeight: 700}}>Category</label>
                        <input 
                            className="border-bottom border-0 border-2 me-2 border-danger"
                            style={{width: "210px"}}
                            type="text" 
                            name="category" 
                            value={category} 
                            onChange={e => setCategory(e.target.value)}
                            required 
                        />

                        <button 
                            type="submit" 
                            className="text-white fw-bold btn btn-sm mb-1"
                            style={{background: "#ED872D", width: "70px"}}
                            >{edit ? "Update" : "Create"}
                        </button>
                    </form>

                    <div className="categories">
                        {
                            categories.map(category => (
                                <div className="d-flex justify-content-between align-items-center p-2 border border-2" key={category._id}>
                                    <p className="align-items-center pt-3">{category.name}</p>
                                    <div>
                                        <button onClick={() => editCategory(category._id, category.name)} className="btn btn-sm btn-secondary text-white fw-bold ms-3" style={{width: "70px"}}>Edit</button>
                                        <button onClick={() => confirmDelete(category._id)} className="btn btn-sm btn-danger text-white fw-bold ms-3" style={{width: "70px"}}>Delete</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div> : <NotFound/>
        }
        </>
    )
}

export default Categories;