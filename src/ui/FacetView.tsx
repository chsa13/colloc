import { Link } from 'react-router-dom';
import type { Kind, Unit } from '../content/schema';
import { KIND_LABEL } from '../content/schema';
import { levelVisible, unitById } from '../engine/catalog';
import type { Mode } from '../store/progress';
import { useProgress } from '../store/progress';
import { LevelBadge, StatusDot } from './LevelSwitch';
import { Md } from './Md';

/** Содержимое одной грани: текст определения/формулировки или доказательство по шагам. */
export function FacetBody({ unit, kind, withStatement = true }: { unit: Unit; kind: Kind; withStatement?: boolean }) {
  if (kind === 'proof') {
    const p = unit.proof!;
    return (
      <div className="facet-body">
        {withStatement && unit.statement && (
          <div className="stmt-ref">
            <div className="label">Формулировка</div>
            <Md text={unit.statement.text} />
          </div>
        )}
        <div className="idea">
          <span className="label">Идея</span> <Md text={p.idea} inline />
        </div>
        <ol className="steps">
          {p.steps.map((s, i) => (
            <li key={i}>
              <div className="step-title">
                <Md text={s.title} inline />
              </div>
              <Md text={s.body} />
            </li>
          ))}
        </ol>
      </div>
    );
  }
  return (
    <div className="facet-body">
      <Md text={unit[kind]!.text} />
    </div>
  );
}

export function UsesLinks({ unit }: { unit: Unit }) {
  if (!unit.uses?.length) return null;
  return (
    <div className="uses">
      <span className="label">Опирается на:</span>{' '}
      {unit.uses.map((id, i) => {
        const u = unitById.get(id);
        if (!u) return null;
        return (
          <span key={id}>
            {i > 0 && ', '}
            <Link to={`/topic/${u.topic.id}?u=${id}`}>{u.unit.title}</Link>
          </span>
        );
      })}
    </div>
  );
}

/** Карточка единицы в справочнике: все видимые грани + примечания. */
export function UnitCard({ unit, mode }: { unit: Unit; mode: Mode }) {
  const st = useProgress();
  const kinds = (['definition', 'statement', 'proof'] as const).filter((k) => unit[k]);
  return (
    <article className="unit" id={`u-${unit.id}`}>
      <header className="unit-head">
        <h3>{unit.title}</h3>
        <span className="muted small">{unit.source}</span>
      </header>
      {kinds.map((k) => {
        const f = unit[k]!;
        const visible = levelVisible(f.level, mode);
        const key = `${unit.id}:${k}`;
        return (
          <section key={k} className={`facet ${visible ? '' : 'facet-hidden'}`}>
            <div className="facet-head">
              <LevelBadge level={f.level} />
              <span className="kind">{KIND_LABEL[k]}</span>
              <StatusDot status={st.items[key]?.status ?? 'new'} />
              {k === 'proof' && visible && (
                <Link className="small" to={`/proofs/${unit.id}`}>
                  тренировать →
                </Link>
              )}
            </div>
            {visible ? (
              <FacetBody unit={unit} kind={k} withStatement={false} />
            ) : (
              <div className="muted small">Только продвинутый уровень — включи «+ продвинутый» вверху, чтобы увидеть.</div>
            )}
          </section>
        );
      })}
      {unit.notes && (
        <div className="notes">
          <Md text={unit.notes} />
        </div>
      )}
      {unit.pitfalls?.length ? (
        <div className="pitfalls">
          <div className="label">Типичные ошибки</div>
          <ul>
            {unit.pitfalls.map((p, i) => (
              <li key={i}>
                <Md text={p} inline />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <UsesLinks unit={unit} />
    </article>
  );
}
