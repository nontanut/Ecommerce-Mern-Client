import { useEffect, useState } from "react";
import axios from "axios";

const GetProducts = () => {
    const [products, setProducts] = useState([]);
    const [callData, setCallData] = useState(false); 
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [result, setResult] = useState(0);

    // call data
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/getallproducts?limit=${page*9}&${category}&${sort}&title[regex]=${search}`)
            setProducts(res.data.products);
            setResult(res.data.result);
        }
        fetchData();
    }, [callData, category, sort, search, page])

    return {
        products: [products, setProducts],
        callData: [callData, setCallData],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result]
    }
}

export default GetProducts