import { useState, useEffect } from "react";
import axios from "axios";

const Category = () => {
    const [category, setCategory] = useState([]);
    const [callback, setCallback] = useState(false);

    // connect to server for create category
    useEffect(() => {
        const getCategory = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/category`)
            setCategory(res.data)
        }
        getCategory()
    }, [callback])

    return {
        category: [category, setCategory],
        callback: [callback, setCallback]
    }
}

export default Category;