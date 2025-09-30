"use client";
import { useState, useEffect } from "react";
import { getProducts } from "../services/services";
import "../styles/ditto.css";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortKey, setSortKey] = useState("price");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const debouncedNameFilter = useDebounce(nameFilter, 500);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts(100);
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="loading">Loading Products...</p>;

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(debouncedNameFilter.toLowerCase()) &&
      (categoryFilter ? p.category === categoryFilter : true)
  );

  const sorted = [...filtered].sort((a, b) =>
    sortKey === "price" ? a.price - b.price : a.rating - b.rating
  );

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sorted.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  const clearFilters = () => {
    setNameFilter("");
    setCategoryFilter("");
    setCurrentPage(1);
  };

  return (
    <div className="ditto-container">
      <h2>Products</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by Name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="search-input"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="category-select"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="sort-select"
        >
          <option value="price">Sort by Price</option>
          <option value="rating">Sort by Rating</option>
        </select>

        <button className="clear-btn" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      <table className="ditto-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.rating}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          &#8592;
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}
