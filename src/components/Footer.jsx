export default function Footer() {
  return (
    <footer className="glass-footer">
      <div className="container-pad py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="font-semibold text-slate-900 dark:text-slate-100 font-heading">Suos Store</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Frontend-only ecommerce UI
            </div>
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Suos Reach. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
