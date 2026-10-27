import type { Readiness } from '../engine/catalog';

export function ProgressBar({ r }: { r: Readiness }) {
  const pct = (n: number) => (r.total ? (n / r.total) * 100 : 0);
  return (
    <div>
      <div className="pbar" role="img" aria-label={`знаю ${r.known} из ${r.total}`}>
        <span className="pb-known" style={{ width: `${pct(r.known)}%` }} />
        <span className="pb-shaky" style={{ width: `${pct(r.shaky)}%` }} />
        <span className="pb-weak" style={{ width: `${pct(r.weak)}%` }} />
      </div>
      <div className="pbar-legend small">
        <span>
          <i className="dot dot-known" /> знаю {r.known}
        </span>
        <span>
          <i className="dot dot-shaky" /> частично {r.shaky}
        </span>
        <span>
          <i className="dot dot-weak" /> не знаю {r.weak}
        </span>
        <span>
          <i className="dot dot-new" /> новых {r.fresh}
        </span>
      </div>
    </div>
  );
}
