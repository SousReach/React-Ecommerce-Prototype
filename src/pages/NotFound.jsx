import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container-pad py-10">
      <div className="card p-6">
        <div className="text-2xl font-extrabold text-slate-900">404</div>
        <p className="mt-2 text-slate-600">Page not found.</p>
        <Link className="btn-primary mt-4 inline-flex" to="/">
          Go Home
        </Link>
      </div>
    </div>
  );
}
