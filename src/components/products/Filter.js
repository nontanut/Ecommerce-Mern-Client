import { useContext } from "react";
import { DataContext } from "../../contexts/Context";

const Filter = () => {
    const state = useContext(DataContext);
    const [categoryProducts] = state.category.category;
    const [category, setCategory] = state.getProducts.category;
    const [sort, setSort] = state.getProducts.sort;
    const [search, setSearch] = state.getProducts.search;

    const handleCategory = e => {
        setCategory(e.target.value);
        // let reset search bar when select any category
        setSearch("");
    }

    return (
        <div className="d-flex flex-wrap justify-content-between align-items-center my-3 mx-3" style={{overflow: "hidden", minHeight: "35px"}} id="filter">
            <div id="filterRow">
                {/* Filter by category */}
                <span>Filter: </span>
                <select 
                    name="category" 
                    value={category} 
                    onChange={handleCategory}
                    className="border border-2 rounded-3"
                    style={{height: "35px"}}
                    >
                    <option value="">All Products</option>
                    {
                        categoryProducts.map(category => (
                            <option value={"category=" + category._id} key={category._id}>
                                {/* Show option by category name */}
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            {/* Search bar */}
            <input 
                type="text" 
                value={search} 
                placeholder=" Search anything your want from us."
                onChange={e => setSearch(e.target.value.toLocaleLowerCase())}
                className="border border-2 mx-2 rounded-3"
                style={{height: "35px", flex: 1}}
            />

            {/* Sort */}
            <div id="filterSort">
                <span>Sort By: </span>
                <select 
                    value={sort} 
                    onChange={e => setSort(e.target.value)} 
                    className="border border-2 rounded-3"
                    style={{height: "35px"}}
                    >
                    <option value="">Newest</option>
                    <option value="sort=oldest">Oldest</option>
                    <option value="sort=-sold">Best Saler</option>
                    <option value="sort=-price">Price: High-Low</option>
                    <option value="sort=price">Price: Low-High</option>
                </select>
            </div>
        </div>
    )
}

export default Filter;