import { Link } from "react-router-dom";
import { formatUSD } from "../utils/money";
import SafeImage from "./SafeImage";
import { Heart, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";

function Badge({ children, tone = "default" }) {
  const cls =
    tone === "new"
      ? "bg-brand-900 text-white"
      : tone === "featured"
        ? "bg-brand-50 text-brand-900 border border-brand-300 dark:bg-slate-900 dark:text-brand-300 dark:border-slate-700"
        : "bg-white text-slate-700 border border-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-700";

  return <span className={`badge ${cls}`}>{children}</span>;
}

function IconBtn({ onClick, title, children, ariaLabel }) {
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={ariaLabel || title}
      className="
        h-10 w-10 rounded-xl inline-flex items-center justify-center transition
        bg-white/90 border border-slate-200 hover:bg-white
        dark:bg-slate-950/60 dark:border-slate-700 dark:hover:bg-slate-900/70
        dark:backdrop-blur
      "
    >
      {children}
    </button>
  );
}

export default function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWish = useWishlistStore((s) => s.toggle);
  const isWished = useWishlistStore((s) => s.has(product.id));

  function onQuickAdd(e) {
    e.preventDefault();
    e.stopPropagation();

    const size = product.sizes?.[0] ?? "M";
    const color = product.colors?.[0] ?? "#EB4C4C";

    addItem(product, { size, color });
    toast.success("Added to cart");
  }

  function onToggleWish(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleWish(product.id);
    toast.success(isWished ? "Removed from wishlist" : "Saved to wishlist");
  }

  return (
    <Link to={`/products/${product.id}`} className="group card overflow-hidden relative">
      <div className="aspect-[4/5] w-full overflow-hidden bg-slate-50 dark:bg-slate-900/40 relative">
        <SafeImage
          src={product.images?.[0]}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {product.isNew && <Badge tone="new">NEW</Badge>}
          {product.featured && <Badge tone="featured">FEATURED</Badge>}
        </div>

        {/* Actions */}
        <div className="absolute top-3 right-3 flex gap-2">
          <IconBtn
            onClick={onToggleWish}
            title={isWished ? "Remove from wishlist" : "Save to wishlist"}
          >
            <Heart
              className={`h-5 w-5 ${isWished
                ? "fill-brand-900 text-brand-900 dark:fill-brand-300 dark:text-brand-300"
                : "text-slate-700 dark:text-slate-200"
                }`}
            />
          </IconBtn>

          <IconBtn onClick={onQuickAdd} title="Quick add to cart">
            <ShoppingCart className="h-5 w-5 text-slate-700 dark:text-slate-200" />
          </IconBtn>
        </div>
      </div>

      <div className="p-4">
        <div className="text-sm text-slate-500">{product.category}</div>
        <div className="mt-1 font-semibold">{product.name}</div>

        <div className="mt-2 flex items-center justify-between">
          <div className="font-bold text-brand-900 dark:text-brand-300">
            {formatUSD(product.price)}
          </div>
          <div className="flex gap-1">
            {(product.colors ?? []).slice(0, 3).map((c) => (
              <span
                key={c}
                className="h-4 w-4 rounded-full border border-slate-200 dark:border-slate-700"
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
