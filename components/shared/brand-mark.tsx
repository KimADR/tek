export function BrandMark({
  compact = false,
  light = false,
}: {
  compact?: boolean;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white shadow-sm">
        TF
      </div>
      {!compact ? (
        <div>
          <p className={light ? "text-base font-semibold text-white" : "text-base font-semibold text-slate-900"}>
            TekFutura
          </p>
          <p className={light ? "text-xs text-slate-300" : "text-xs text-slate-600"}>
            Gestion des formations
          </p>
        </div>
      ) : null}
    </div>
  );
}
