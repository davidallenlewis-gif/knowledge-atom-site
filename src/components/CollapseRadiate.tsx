import { useEffect, useRef, useState } from 'react';

export default function CollapseRadiate() {
  const [played, setPlayed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !played) setPlayed(true); },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [played]);

  return (
    <div ref={ref} className={`stage ${played ? 'go' : ''}`}>
      <div className="course-stack">
        {[false, true, false, false, true, false, false].map((lit, i) => (
          <div key={i} className={`bar ${lit ? 'lit' : ''}`} />
        ))}
      </div>
      <div className="nucleus"><span>knowledge<br/>·core·</span></div>
      <div className="electron e1" style={{ left: '8%', top: '14%' }}>Q&amp;A</div>
      <div className="electron e2" style={{ right: '6%', top: '24%' }}>scenario</div>
      <div className="electron e3" style={{ left: '12%', bottom: '14%' }}>job aid</div>
      <div className="electron e4" style={{ right: '10%', bottom: '20%' }}>micro</div>
    </div>
  );
}
