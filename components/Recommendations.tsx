import type { RecommendationExplanation } from '../lib/types';

export default function Recommendations({ recommendations }: { recommendations: RecommendationExplanation[] }) {
  if (recommendations.length === 0) return <p className="small">No recommendations. Try changing the context or pick another user.</p>;
  return (
    <div>
      {recommendations.map(r => (
        <div key={r.itemId} className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
            <strong>Item {r.itemId}</strong>
            <span className="small">score: {r.score.toFixed(3)}</span>
          </div>
          <div className="small">
            Top contributing contexts:
            <ul>
              {r.topContexts.map((c, i) => (
                <li key={i}>
                  sim {c.similarity.toFixed(2)}, contrib {c.contribution.toFixed(3)} ? {c.count}x, +{c.positives}
                  <br/>
                  <code className="inline">{c.observed.timeOfDay}/{c.observed.dayType}/{c.observed.season}/{c.observed.location}/{c.observed.weather}/{c.observed.companion}/{c.observed.mood}</code>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
