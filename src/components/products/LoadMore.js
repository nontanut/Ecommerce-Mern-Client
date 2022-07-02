import { useContext } from "react";
import { DataContext } from "../../contexts/Context";

const LoadMore = () => {
    const state = useContext(DataContext);
    const [page, setPage] = state.getProducts.page;
    const [result] = state.getProducts.result;

    return(
        <div className="text-center">
            {
                // if click loadmore will be add more data product from next page data
                result < page * 9 ? "" : <p onClick={() => setPage(page+1)} className="btn btn-outline-danger fw-bold border border-3 border-danger w-auto">Load More</p>
            }
        </div>
    )
}

export default LoadMore;