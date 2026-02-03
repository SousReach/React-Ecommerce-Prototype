import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products, categories, sizes } from "../data/products";
import { SlidersHorizontal, X } from "lucide-react";

function includesQuery(text, q) {
  return text.toLowerCase().includes(q.toLowerCase());
}

function sortProducts(list, sortKey) {
  const arr = list.slice();
  switch (sortKey) {
    case "price_asc":
      return arr.sort((a, b) => a.price - b.price);
    case "price_desc":
      return arr.sort((a, b) => b.price - a.price);
    case "name_asc":
      return arr.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return arr; // relevance
  }
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL params
  const qParam = searchParams.get("q") ?? "";
  const categoryParam = searchParams.get("category") ?? "All";
  const sizeParam = searchParams.get("size") ?? "All";
  const maxPriceParam = Number(searchParams.get("maxPrice") ?? 999);
  const sortParam = searchParams.get("sort") ?? "relevance";

  // local state
  const [q, setQ] = useState(qParam);
  const [category, setCategory] = useState(categoryParam);
  const [size, setSize] = useState(sizeParam);
  const [maxPrice, setMaxPrice] = useState(Number.isFinite(maxPriceParam) ? maxPriceParam : 999);
  const [sort, setSort] = useState(sortParam);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredAndSorted = useMemo(() => {
    const filtered = products.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (size !== "All" && !(p.sizes ?? []).includes(size)) return false;
      if (p.price > maxPrice) return false;
      if (q.trim() && !includesQuery(`${p.name} ${p.category} ${p.description}`, q.trim())) return false;
      return true;
    });

    return sortProducts(filtered, sort);
  }, [q, category, size, maxPrice, sort]);

  function applyFilters() {
    const next = new URLSearchParams();
    if (q.trim()) next.set("q", q.trim());
    if (category !== "All") next.set("category", category);
    if (size !== "All") next.set("size", size);
    if (maxPrice !== 999) next.set("maxPrice", String(maxPrice));
    if (sort !== "relevance") next.set("sort", sort);
    setSearchParams(next);
  }

  function resetFilters() {
    setQ("");
    setCategory("All");
    setSize("All");
    setMaxPrice(999);
    setSort("relevance");
    setSearchParams(new URLSearchParams());
  }

  const chips = useMemo(() => {
    const list = [];
    if (q.trim()) list.push({ key: "q", label: `Search: "${q.trim()}"` });
    if (category !== "All") list.push({ key: "category", label: `Category: ${category}` });
    if (size !== "All") list.push({ key: "size", label: `Size: ${size}` });
    if (maxPrice !== 999) list.push({ key: "maxPrice", label: `Max: $${maxPrice}` });
    if (sort !== "relevance") {
      const pretty =
        sort === "price_asc" ? "Price: Low → High" :
        sort === "price_desc" ? "Price: High → Low" :
        sort === "name_asc" ? "Name: A → Z" :
        "Relevance";
      list.push({ key: "sort", label: `Sort: ${pretty}` });
    }
    return list;
  }, [q, category, size, maxPrice, sort]);

  function removeChip(key) {
    if (key === "q") setQ("");
    if (key === "category") setCategory("All");
    if (key === "size") setSize("All");
    if (key === "maxPrice") setMaxPrice(999);
    if (key === "sort") setSort("relevance");
  }

  function FiltersPanel({ compact = false }) {
    return (
      <div className={compact ? "" : "card p-5 lg:w-72 h-fit"}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Filters</h2>
          {compact && (
            <button
              className="btn-ghost px-3 py-2"
              onClick={() => setMobileFiltersOpen(false)}
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="mt-4">
          <label className="text-sm font-semibold text-slate-700">Search</label>
          <input
            className="input mt-2"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                applyFilters();
                setMobileFiltersOpen(false);
              }
            }}
            placeholder="e.g. hoodie"
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-semibold text-slate-700">Category</label>
          <select className="input mt-2" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <label className="text-sm font-semibold text-slate-700">Size</label>
          <select className="input mt-2" value={size} onChange={(e) => setSize(e.target.value)}>
            {sizes.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <label className="text-sm font-semibold text-slate-700">
            Max Price: <span className="text-brand-900 font-bold">${maxPrice}</span>
          </label>
          <input
            className="mt-2 w-full"
            type="range"
            min="10"
            max="100"
            step="1"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-semibold text-slate-700">Sort</label>
          <select className="input mt-2" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="relevance">Relevance</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="name_asc">Name: A → Z</option>
          </select>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            className="btn-primary flex-1"
            onClick={() => {
              applyFilters();
              setMobileFiltersOpen(false);
            }}
          >
            Apply
          </button>
          <button
            className="btn-ghost"
            onClick={() => {
              resetFilters();
              setMobileFiltersOpen(false);
            }}
          >
            Reset
          </button>
        </div>

        <div className="mt-4 text-xs text-slate-500">
          Tip: Frontend-only. Products are mock data for now.
        </div>
      </div>
    );
  }

  return (
    <div className="container-pad py-10">
      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-soft p-5 overflow-auto">
            
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          
        </div>

        <section className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Shop</h1>
              <div className="text-sm text-slate-600 mt-1">
                {filteredAndSorted.length} item{filteredAndSorted.length === 1 ? "" : "s"}
              </div>
            </div>

            {/* Mobile Filters button */}
            <div className="flex items-center gap-3">
              <button
                className="btn-ghost lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <SlidersHorizontal className="h-5 w-5 mr-2" />
                Filters
              </button>

              {/* Desktop quick sort box */}
              <div className="hidden lg:flex card p-3 items-center gap-3">
                <label className="text-sm font-semibold text-slate-700">Sort</label>
                <select className="input w-56" value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="relevance">Relevance</option>
                  <option value="price_asc">Price: Low → High</option>
                  <option value="price_desc">Price: High → Low</option>
                  <option value="name_asc">Name: A → Z</option>
                </select>
                <button className="btn-ghost" onClick={applyFilters}>Apply</button>
              </div>
            </div>
          </div>

          {/* Active chips */}
          {chips.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {chips.map((c) => (
                <button
                  key={c.key}
                  onClick={() => removeChip(c.key)}
                  className="badge bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                  title="Click to remove"
                >
                  {c.label} <span className="ml-2 text-slate-500">✕</span>
                </button>
              ))}

              <button
                onClick={resetFilters}
                className="badge bg-brand-50 text-brand-900 border border-brand-300 hover:bg-white"
              >
                Clear all
              </button>
            </div>
          )}

          <div className="mt-6 grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredAndSorted.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {filteredAndSorted.length === 0 && (
            <div className="mt-10 card p-6 text-slate-700">
              No products match your filters. Try resetting.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
