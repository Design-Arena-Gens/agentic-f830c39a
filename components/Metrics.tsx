import type { Metrics } from '../lib/types';

export default function Metrics({ metrics }: { metrics: Metrics }) {
  return (
    <table style={{width:'100%'}}>
      <tbody>
        <tr><td>Precision@K</td><td>{metrics.precisionAtK.toFixed(4)}</td></tr>
        <tr><td>Recall@K (HitRate)</td><td>{metrics.recallAtK.toFixed(4)}</td></tr>
        <tr><td>MRR</td><td>{metrics.meanReciprocalRank.toFixed(4)}</td></tr>
        <tr><td>Coverage</td><td>{(metrics.coverage*100).toFixed(1)}%</td></tr>
        <tr><td>Evaluated interactions</td><td>{metrics.evaluatedInteractions}</td></tr>
      </tbody>
    </table>
  );
}
