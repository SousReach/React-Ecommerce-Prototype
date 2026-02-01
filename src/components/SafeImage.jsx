import { useState } from "react";

export default function SafeImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`flex items-center justify-center bg-brand-50 border border-slate-200 text-slate-500 ${className}`}
        role="img"
        aria-label={alt || "Image placeholder"}
      >
        <div className="text-center">
          <div className="text-sm font-semibold text-slate-600">Image</div>
          <div className="text-xs text-slate-500">Unavailable</div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
