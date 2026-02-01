import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

export default function OrderSuccess() {
  return (
    <div className="container-pad py-10">
      <div className="card p-6">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-brand-50 border border-brand-300 inline-flex items-center justify-center">
            <CheckCircle2 className="h-7 w-7 text-brand-900" />
          </div>

          <div className="flex-1">
            <div className="badge bg-brand-50 text-brand-900 border border-brand-300">
              Success (Demo)
            </div>

            <h1 className="mt-3 text-2xl font-extrabold text-slate-900">
              Order placed successfully
            </h1>

            <p className="mt-2 text-slate-600 leading-relaxed">
              This is a frontend-only confirmation page. Later we’ll connect a backend,
              payments, and real order tracking.
            </p>

            <div className="mt-5 grid sm:grid-cols-3 gap-3">
              <div className="card p-4">
                <div className="font-bold text-slate-900">Next step</div>
                <div className="text-sm text-slate-600">Continue shopping</div>
              </div>
              <div className="card p-4">
                <div className="font-bold text-slate-900">Future feature</div>
                <div className="text-sm text-slate-600">Order tracking</div>
              </div>
              <div className="card p-4">
                <div className="font-bold text-slate-900">Future feature</div>
                <div className="text-sm text-slate-600">Email receipt</div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="btn-primary" to="/products">
                Continue Shopping
              </Link>
              <Link className="btn-ghost" to="/wishlist">
                View Wishlist
              </Link>
              <Link className="btn-ghost" to="/">
                Back Home
              </Link>
            </div>

            <div className="mt-4 text-xs text-slate-500">
              Tip: Try saving items to Wishlist and quick-adding from the product cards.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
