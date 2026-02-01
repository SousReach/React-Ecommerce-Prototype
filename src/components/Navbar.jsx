import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, User, Heart } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import ThemeInit from "./ThemeInit";

function navClass({ isActive }) {
  return isActive
    ? "text-brand-900 dark:text-brand-300 font-semibold"
    : "text-slate-700 dark:text-slate-200 hover:text-brand-900 dark:hover:text-brand-300";
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
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-950/85 backdrop-blur border-b border-slate-100 dark:border-slate-800">
      {/* Ensures theme applies on load */}
      <ThemeInit />

      <div className="container-pad">
        <div className="flex items-center justify-between py-4 gap-3">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="inline-flex h-9 w-9 rounded-xl bg-brand-900" />
            <div className="leading-tight">
              <div className="font-bold text-slate-900 dark:text-slate-100">Suos Store</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Clothing</div>
            </div>
          </Link>

          {/* Desktop search */}
          <form onSubmit={onSubmit} className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                className="input pl-11"
                placeholder="Search products..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
          </form>

          <nav className="flex items-center gap-3 shrink-0">
            <NavLink to="/products" className={navClass}>
              Shop
            </NavLink>

            <NavLink to="/account" className={navClass}>
              <span className="hidden sm:inline">Account</span>
              <User className="inline sm:hidden h-5 w-5" />
            </NavLink>

            {/* Theme */}
            <ThemeToggle />

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800"
              title="Wishlist"
            >
              <Heart className="h-5 w-5 text-slate-800 dark:text-slate-100" />
              <span className="hidden sm:inline font-medium text-slate-900 dark:text-slate-100">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-800 text-white text-xs font-bold rounded-full h-6 w-6 inline-flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800"
              title="Cart"
            >
              <ShoppingBag className="h-5 w-5 text-slate-800 dark:text-slate-100" />
              <span className="hidden sm:inline font-medium text-slate-900 dark:text-slate-100">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-900 text-white text-xs font-bold rounded-full h-6 w-6 inline-flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>
        </div>

        {/* Mobile search */}
        <form onSubmit={onSubmit} className="md:hidden pb-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              className="input pl-11"
              placeholder="Search products..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </form>
      </div>
    </header>
  );
}
