"use client";
import { useMemo, useState } from 'react';
import { loadSampleDataset, HabitEngine, evaluateTopK } from '../../lib/habits';
import type { Context, RecordRow } from '../../lib/types';
import Recommendations from '../../components/Recommendations';
import Metrics from '../../components/Metrics';
import Uploader from '../../components/Uploader';

export default function Client() {
  const [rows, setRows] = useState<RecordRow[]>(() => loadSampleDataset());
  const [selectedUser, setSelectedUser] = useState<string>('1');
  const users = useMemo(() => Array.from(new Set(rows.map(r => r.userId))).sort(), [rows]);

  const [target, setTarget] = useState<Context>({
    timeOfDay: 'evening',
    dayType: 'weekend',
    season: 'winter',
    location: 'home',
    weather: 'clear',
    companion: 'alone',
    mood: 'neutral'
  });

  const engine = useMemo(() => new HabitEngine(rows), [rows]);
  const userId = selectedUser;
  const recs = useMemo(() => engine.recommendForUser(userId, target, 10), [engine, userId, target]);

  const [k, setK] = useState(5);
  const metrics = useMemo(() => evaluateTopK(engine, rows, k), [engine, rows, k]);

  return (
    <>
      <section>
        <h2>Dataset</h2>
        <p className="small">Loaded rows: {rows.length}. Users: {users.length}.</p>
        <Uploader onLoad={setRows} />
      </section>

      <section>
        <h2>Target Context & User</h2>
        <div className="grid">
          <div className="card">
            <label>User</label>
            <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
              {users.map(u => <option key={u} value={u}>{u}</option>)}
            </select>

            <label>timeOfDay</label>
            <select value={target.timeOfDay} onChange={e => setTarget({ ...target, timeOfDay: e.target.value as any })}>
              {['morning','afternoon','evening','night'].map(v => <option key={v}>{v}</option>)}
            </select>

            <label>dayType</label>
            <select value={target.dayType} onChange={e => setTarget({ ...target, dayType: e.target.value as any })}>
              {['weekday','weekend'].map(v => <option key={v}>{v}</option>)}
            </select>

            <label>season</label>
            <select value={target.season} onChange={e => setTarget({ ...target, season: e.target.value as any })}>
              {['winter','spring','summer','autumn'].map(v => <option key={v}>{v}</option>)}
            </select>

            <label>location</label>
            <select value={target.location} onChange={e => setTarget({ ...target, location: e.target.value as any })}>
              {['home','public','friend'].map(v => <option key={v}>{v}</option>)}
            </select>

            <label>weather</label>
            <select value={target.weather} onChange={e => setTarget({ ...target, weather: e.target.value as any })}>
              {['clear','rain','snow','cloudy'].map(v => <option key={v}>{v}</option>)}
            </select>

            <label>companion</label>
            <select value={target.companion} onChange={e => setTarget({ ...target, companion: e.target.value as any })}>
              {['alone','partner','friends','family','colleagues'].map(v => <option key={v}>{v}</option>)}
            </select>

            <label>mood</label>
            <select value={target.mood} onChange={e => setTarget({ ...target, mood: e.target.value as any })}>
              {['negative','neutral','positive'].map(v => <option key={v}>{v}</option>)}
            </select>
          </div>

          <div className="card">
            <h3>Top Recommendations</h3>
            <Recommendations recommendations={recs} />
          </div>
        </div>
      </section>

      <section>
        <h2>Evaluation</h2>
        <div className="grid">
          <div className="card">
            <label>k</label>
            <input type="number" value={k} min={1} max={20} onChange={e => setK(parseInt(e.target.value || '1'))} />
            <p className="small">Metric computed with leave-one-out per interaction.</p>
          </div>
          <div className="card">
            <Metrics metrics={metrics} />
          </div>
        </div>
      </section>
    </>
  );
}
