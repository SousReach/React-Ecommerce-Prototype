import { useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { formatUSD } from "../utils/money";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(6, "Phone is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  zip: z.string().min(3, "ZIP/Postal code is required"),
});

export default function Checkout() {
  const navigate = useNavigate();

  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const clear = useCartStore((s) => s.clear);

  const shipping = items.length > 0 ? 4.99 : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const canCheckout = useMemo(() => items.length > 0, [items.length]);

  function onSubmit() {
    if (!canCheckout) {
      toast.error("Your cart is empty");
      return;
    }

    // Frontend-only demo “place order”
    clear();
    toast.success("Order placed (demo)");
    navigate("/order-success");
  }

  if (!canCheckout) {
    return (
      <div className="container-pad py-10">
        <div className="card p-6">
          <div className="text-xl font-bold text-slate-900">Checkout</div>
          <p className="mt-2 text-slate-600">Your cart is empty.</p>
          <Link to="/products" className="btn-primary mt-4 inline-flex">
            Go shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-pad py-10">
      <div className="flex items-baseline justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-slate-900">Checkout</h1>
        <Link to="/cart" className="text-brand-900 font-semibold hover:underline">
          Back to cart
        </Link>
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <form className="lg:col-span-2 card p-5" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-lg font-bold text-slate-900">Shipping Details</h2>

          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">Full name</label>
              <input className="input mt-2" {...register("fullName")} />
              {errors.fullName && <div className="mt-1 text-sm text-red-600">{errors.fullName.message}</div>}
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">Email</label>
              <input className="input mt-2" {...register("email")} />
              {errors.email && <div className="mt-1 text-sm text-red-600">{errors.email.message}</div>}
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">Phone</label>
              <input className="input mt-2" {...register("phone")} />
              {errors.phone && <div className="mt-1 text-sm text-red-600">{errors.phone.message}</div>}
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">City</label>
              <input className="input mt-2" {...register("city")} />
              {errors.city && <div className="mt-1 text-sm text-red-600">{errors.city.message}</div>}
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-semibold text-slate-700">Address</label>
              <input className="input mt-2" {...register("address")} />
              {errors.address && <div className="mt-1 text-sm text-red-600">{errors.address.message}</div>}
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">ZIP / Postal</label>
              <input className="input mt-2" {...register("zip")} />
              {errors.zip && <div className="mt-1 text-sm text-red-600">{errors.zip.message}</div>}
            </div>
          </div>

          <button disabled={isSubmitting} className="btn-primary w-full mt-6">
            {isSubmitting ? "Placing order..." : "Place Order (Demo)"}
          </button>

          <div className="mt-3 text-xs text-slate-500">
            This is a frontend-only checkout UI. No payment, no backend.
          </div>
        </form>

        <aside className="card p-5 h-fit">
          <h2 className="text-lg font-bold text-slate-900">Summary</h2>

          <div className="mt-4 space-y-2 text-slate-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">{formatUSD(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold">{formatUSD(shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax (5%)</span>
              <span className="font-semibold">{formatUSD(tax)}</span>
            </div>
            <div className="pt-3 border-t border-slate-200 flex justify-between text-slate-900">
              <span className="font-bold">Total</span>
              <span className="font-extrabold text-brand-900">{formatUSD(total)}</span>
            </div>
          </div>

          <div className="mt-5 text-sm text-slate-600">
            Items: <b>{items.length}</b>
          </div>
        </aside>
      </div>
    </div>
  );
}
