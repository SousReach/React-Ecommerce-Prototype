import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, User, Heart } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import ThemeInit from "./ThemeInit";

function navLinkClass({ isActive }) {
  return `liquid-nav-link ${isActive ? "active" : ""}`;
}

export default function Navbar() {
  const navigate = useNavigate();
  const cartCount = useCartStore((s) => s.count());
  const wishlistCount = useWishlistStore((s) => s.ids.length);
  const [q, setQ] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    navigate(`/products?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <>
      <ThemeInit />

      {/* Floating liquid glass navbar */}
      <div className="liquid-glass-nav">
        <header className="liquid-glass">
          <div className="mx-auto w-full max-w-6xl px-5">
            {/* Main row */}
            <div className="relative z-10 flex items-center justify-between py-3 gap-4">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
                <span className="inline-flex h-9 w-9 rounded-2xl bg-brand-900/80 backdrop-blur-sm shadow-sm group-hover:scale-105 transition-transform duration-300" />
                <div className="leading-tight">
                  <div className="font-bold text-[0.95rem] font-heading text-slate-800 dark:text-slate-100">
                    Suos Store
                  </div>
                  <div className="text-[0.65rem] uppercase tracking-widest text-slate-500/70 dark:text-slate-400/70 font-medium">
                    Clothing
                  </div>
                </div>
              </Link>

              {/* Desktop search */}
              <form onSubmit={onSubmit} className="hidden md:flex flex-1 max-w-md">
                <div className="relative w-full">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400/70" />
                  <input
                    className="liquid-glass-search w-full pl-10 pr-4 py-2.5 text-sm outline-none"
                    placeholder="Search products..."
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                  />
                </div>
              </form>

              {/* Nav actions */}
              <nav className="flex items-center gap-1.5 shrink-0">
                <NavLink to="/products" className={navLinkClass}>
                  Shop
                </NavLink>

                <NavLink to="/account" className={navLinkClass}>
                  <span className="hidden sm:inline">Account</span>
                  <User className="inline sm:hidden h-4 w-4" />
                </NavLink>

                {/* Theme toggle */}
                <ThemeToggle />

                {/* Wishlist */}
                <Link
                  to="/wishlist"
                  className="liquid-glass-pill relative inline-flex items-center gap-2 px-3 py-2"
                  title="Wishlist"
                >
                  <Heart className="h-4 w-4 text-slate-700 dark:text-slate-200" />
                  <span className="hidden sm:inline text-sm font-medium text-slate-700 dark:text-slate-200">
                    Wishlist
                  </span>
                  {wishlistCount > 0 && (
                    <span className="liquid-glass-badge">{wishlistCount}</span>
                  )}
                </Link>

                {/* Cart */}
                <Link
                  to="/cart"
                  className="liquid-glass-pill relative inline-flex items-center gap-2 px-3 py-2"
                  title="Cart"
                >
                  <ShoppingBag className="h-4 w-4 text-slate-700 dark:text-slate-200" />
                  <span className="hidden sm:inline text-sm font-medium text-slate-700 dark:text-slate-200">
                    Cart
                  </span>
                  {cartCount > 0 && (
                    <span className="liquid-glass-badge">{cartCount}</span>
                  )}
                </Link>
              </nav>
            </div>

            {/* Mobile search */}
            <form onSubmit={onSubmit} className="relative z-10 md:hidden pb-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400/70" />
                <input
                  className="liquid-glass-search w-full pl-10 pr-4 py-2.5 text-sm outline-none"
                  placeholder="Search products..."
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>
            </form>
          </div>
        </header>
      </div>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="liquid-glass-spacer" />
    </>
  );
}
