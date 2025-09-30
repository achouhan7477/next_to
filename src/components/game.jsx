"use client";
import { useState, useEffect, useRef } from "react";
import { getProducts } from "../services/services";
import "../styles/ditto.css";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortKey, setSortKey] = useState("price");
  const [visibleCount, setVisibleCount] = useState(10);
  const [loadingMore, setLoadingMore] = useState(false);

  const loaderRef = useRef(null);
  const debouncedNameFilter = useDebounce(nameFilter, 500);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts(100);
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(debouncedNameFilter.toLowerCase()) &&
      (categoryFilter ? p.category === categoryFilter : true)
  );

  const sorted = [...filtered].sort((a, b) =>
    sortKey === "price" ? a.price - b.price : a.rating - b.rating
  );

  const visibleProducts = sorted.slice(0, visibleCount);

  const clearFilters = () => {
    setNameFilter("");
    setCategoryFilter("");
    setVisibleCount(10);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && visibleCount < sorted.length && !loadingMore) {
          setLoadingMore(true);

          setTimeout(() => {
            setVisibleCount((prev) =>
              prev + 10 <= sorted.length ? prev + 10 : sorted.length
            );
            setLoadingMore(false);
          }, 3000);
        }
      },
      { threshold: 1.0 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [visibleCount, sorted.length, loadingMore]);

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

      {loading ? (
        <p className="loading">Loading Products...</p>
      ) : (
        <>
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
              {visibleProducts.map((product) => (
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

          <div ref={loaderRef} style={{ height: "50px" }} />

          {loadingMore && (
            <p style={{ textAlign: "center", marginTop: "10px" }}>
              Loading more products...
            </p>
          )}

          {visibleCount >= sorted.length && !loadingMore && (
            <p style={{ textAlign: "center", marginTop: "10px" }}>
              All products loaded ✅
            </p>
          )}
        </>
      )}
    </div>
  );
}
