import { useState } from 'react';
import { exportJson, importJson, resetProgress, useProgress } from '../store/progress';
import { LevelSwitch } from '../ui/LevelSwitch';

export function SettingsPage() {
  const st = useProgress();
  const [msg, setMsg] = useState('');

  const download = () => {
    const blob = new Blob([exportJson()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `colloc-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const upload = (file: File) => {
    file
      .text()
      .then((t) => {
        importJson(t);
        setMsg('Прогресс загружен.');
      })
      .catch((e: Error) => setMsg(`Ошибка: ${e.message}`));
  };

  return (
    <div className="page">
      <h1>Прогресс и настройки</h1>
      <section className="panel">
        <h3>Уровень</h3>
        <LevelSwitch />
        <p className="muted small">
          «Основной» прячет вопросы продвинутого уровня (⚫) везде: в справочнике, карточках, задачах и пробном билете.
        </p>
      </section>
      <section className="panel">
        <h3>Перенос прогресса</h3>
        <p className="muted small">
          Прогресс хранится только в этом браузере ({Object.keys(st.items).length} отметок, {st.mocks.length} пробных билетов). Чтобы перенести на
          другое устройство — скачай файл и загрузи его там.
        </p>
        <div className="row">
          <button onClick={download}>Скачать прогресс</button>
          <label className="btn">
            Загрузить файл
            <input type="file" accept="application/json" hidden onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
          </label>
          <button
            className="danger"
            onClick={() => {
              if (confirm('Сбросить весь прогресс?')) {
                resetProgress();
                setMsg('Прогресс сброшен.');
              }
            }}
          >
            Сбросить
          </button>
        </div>
        {msg && <p className="small">{msg}</p>}
      </section>
    </div>
  );
}
