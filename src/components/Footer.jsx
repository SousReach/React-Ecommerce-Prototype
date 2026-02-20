export default function Footer() {
  return (
    <footer className="border-t border-slate-100 dark:border-slate-800 mt-10 bg-white dark:bg-slate-950">
      <div className="container-pad py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="font-semibold text-slate-900">Suos Store</div>
            <div className="text-sm text-slate-500">
              Frontend-only ecommerce UI
            </div>
          </div>
          <div className="text-sm text-slate-500">
            © {new Date().getFullYear()} Suos Reach. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
