"use client";
import { useRef } from 'react';
import type { RecordRow } from '../lib/types';
import { parseUserCsv } from '../lib/habits';

export default function Uploader({ onLoad }: { onLoad: (rows: RecordRow[]) => void }) {
  const fileRef = useRef<HTMLInputElement|null>(null);

  const load = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    const text = await file.text();
    const rows = parseUserCsv(text);
    if (rows.length > 0) onLoad(rows);
    else alert('No valid rows parsed. Ensure CSV header matches fields.');
  };

  const sampleCsv = `userId,itemId,rating,timeOfDay,dayType,season,location,weather,companion,mood,timestamp\n1,10,5,evening,weekend,winter,home,clear,alone,positive,1700000000`;

  return (
    <div>
      <input type="file" ref={fileRef} accept=".csv" />
      <button onClick={load} style={{marginLeft:8}}>Load CSV</button>
      <button className="secondary" onClick={() => navigator.clipboard.writeText(sampleCsv)} style={{marginLeft:8}}>Copy CSV template</button>
    </div>
  );
}
