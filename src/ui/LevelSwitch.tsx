import type { Level, Scale } from '../content/schema';
import { setMode, useProgress, type Status } from '../store/progress';

export function LevelSwitch() {
  const { mode } = useProgress();
  return (
    <div className="seg" role="radiogroup" aria-label="Уровень">
      <button role="radio" aria-checked={mode === 'basic'} className={mode === 'basic' ? 'on' : ''} onClick={() => setMode('basic')}>
        <Star scale="red" /> Основной
      </button>
      <button role="radio" aria-checked={mode === 'all'} className={mode === 'all' ? 'on' : ''} onClick={() => setMode('all')}>
        <Star scale="red" />
        <Star scale="black" /> + продвинутый
      </button>
    </div>
  );
}

export function Star({ scale }: { scale: Scale }) {
  return (
    <span className={`star star-${scale}`} title={scale === 'red' ? 'Основной уровень' : 'Продвинутый уровень'}>
      ✱
    </span>
  );
}

export function LevelBadge({ level }: { level: Level }) {
  return level === 'basic' ? <Star scale="red" /> : <Star scale="black" />;
}

export function Stars({ scales }: { scales: Scale[] }) {
  return (
    <span className="stars">
      {scales.map((s) => (
        <Star key={s} scale={s} />
      ))}
    </span>
  );
}

const STATUS_LABEL: Record<Status, string> = { new: 'новое', weak: 'не знаю', shaky: 'частично', known: 'знаю' };

export function StatusDot({ status }: { status: Status }) {
  return <span className={`dot dot-${status}`} title={STATUS_LABEL[status]} />;
}

export { STATUS_LABEL };
