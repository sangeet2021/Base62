import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { linkService } from '@/services/links';

interface ChartPoint {
  name: string;
  clicks: number;
}

const BAR_W = 500;
const BAR_H = 220;
const PAD = { top: 16, right: 16, bottom: 40, left: 36 };

const BarChart: React.FC<{ data: ChartPoint[] }> = ({ data }) => {
  const innerW = BAR_W - PAD.left - PAD.right;
  const innerH = BAR_H - PAD.top - PAD.bottom;

  const maxVal = Math.max(...data.map(d => d.clicks), 1);
  const barW   = Math.min(32, innerW / Math.max(data.length, 1) - 6);
  const step   = innerW / Math.max(data.length, 1);

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(t => Math.round(t * maxVal));

  return (
    <svg viewBox={`0 0 ${BAR_W} ${BAR_H}`} width="100%" height="100%">
      <g transform={`translate(${PAD.left},${PAD.top})`}>
        {yTicks.map(tick => {
          const y = innerH - (tick / maxVal) * innerH;
          return (
            <g key={tick}>
              <line x1={0} y1={y} x2={innerW} y2={y}
                stroke="currentColor" strokeOpacity={0.08} strokeWidth={1} />
              <text x={-6} y={y + 4} textAnchor="end"
                fontSize={10} fill="currentColor" fillOpacity={0.45} fontFamily="monospace">
                {tick}
              </text>
            </g>
          );
        })}

        {data.map((d, i) => {
          const barH = (d.clicks / maxVal) * innerH;
          const x    = i * step + step / 2 - barW / 2;
          const y    = innerH - barH;
          return (
            <g key={d.name}>
              <rect x={x} y={y} width={barW} height={barH}
                fill="#4f46e5" rx={3} ry={3} opacity={0.85} />
              <rect x={i * step} y={0} width={step} height={innerH} fill="transparent">
                <title>{d.name}: {d.clicks} clicks</title>
              </rect>
              <text x={i * step + step / 2} y={innerH + 16}
                textAnchor="middle" fontSize={10} fill="currentColor"
                fillOpacity={0.5} fontFamily="monospace">
                {d.name.length > 7 ? d.name.slice(0, 7) + '…' : d.name}
              </text>
            </g>
          );
        })}

        <line x1={0} y1={0} x2={0} y2={innerH}
          stroke="currentColor" strokeOpacity={0.15} strokeWidth={1} />
        <line x1={0} y1={innerH} x2={innerW} y2={innerH}
          stroke="currentColor" strokeOpacity={0.15} strokeWidth={1} />
      </g>
    </svg>
  );
};

const LINE_W = 500;
const LINE_H = 220;

const LineChart: React.FC<{ data: ChartPoint[] }> = ({ data }) => {
  const innerW = LINE_W - PAD.left - PAD.right;
  const innerH = LINE_H - PAD.top - PAD.bottom;

  const maxVal = Math.max(...data.map(d => d.clicks), 1);
  const step   = innerW / Math.max(data.length - 1, 1);

  const points = data.map((d, i) => ({
    x: i * step,
    y: innerH - (d.clicks / maxVal) * innerH,
    ...d,
  }));

  const polyline = points.map(p => `${p.x},${p.y}`).join(' ');

  const areaPath = points.length > 0
    ? `M ${points[0].x},${innerH} ` +
      points.map(p => `L ${p.x},${p.y}`).join(' ') +
      ` L ${points[points.length - 1].x},${innerH} Z`
    : '';

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(t => Math.round(t * maxVal));

  return (
    <svg viewBox={`0 0 ${LINE_W} ${LINE_H}`} width="100%" height="100%">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#06b6d4" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0"    />
        </linearGradient>
      </defs>

      <g transform={`translate(${PAD.left},${PAD.top})`}>
        {yTicks.map(tick => {
          const y = innerH - (tick / maxVal) * innerH;
          return (
            <g key={tick}>
              <line x1={0} y1={y} x2={innerW} y2={y}
                stroke="currentColor" strokeOpacity={0.08} strokeWidth={1} />
              <text x={-6} y={y + 4} textAnchor="end"
                fontSize={10} fill="currentColor" fillOpacity={0.45} fontFamily="monospace">
                {tick}
              </text>
            </g>
          );
        })}

        {areaPath && <path d={areaPath} fill="url(#areaGrad)" />}

        {points.length > 1 && (
          <polyline points={polyline}
            fill="none" stroke="#06b6d4" strokeWidth={2.5}
            strokeLinejoin="round" strokeLinecap="round" />
        )}

        {points.map(p => (
          <circle key={p.name} cx={p.x} cy={p.y} r={4}
            fill="#06b6d4" stroke="white" strokeWidth={1.5}>
            <title>{p.name}: {p.clicks} clicks</title>
          </circle>
        ))}

        {points.map((p, i) => (
          <text key={p.name} x={p.x} y={innerH + 16}
            textAnchor={i === 0 ? 'start' : i === points.length - 1 ? 'end' : 'middle'}
            fontSize={10} fill="currentColor" fillOpacity={0.5} fontFamily="monospace">
            {p.name.length > 7 ? p.name.slice(0, 7) + '…' : p.name}
          </text>
        ))}

        <line x1={0} y1={0} x2={0} y2={innerH}
          stroke="currentColor" strokeOpacity={0.15} strokeWidth={1} />
        <line x1={0} y1={innerH} x2={innerW} y2={innerH}
          stroke="currentColor" strokeOpacity={0.15} strokeWidth={1} />
      </g>
    </svg>
  );
};

const Analytics: React.FC = () => {
  const { data: links = [], isLoading } = useQuery({
    queryKey: ['links'],
    queryFn: linkService.getAllLinks,
  });

  const [selectedLinkId, setSelectedLinkId] = useState<string>('all');

  const totalLinks = links.length;
  
  const totalClicks = useMemo(() => {
    if (selectedLinkId === 'all') {
      return links.reduce((sum, item) => sum + item.clicks, 0);
    }
    const matched = links.find(item => item.short_id === selectedLinkId);
    return matched ? matched.clicks : 0;
  }, [links, selectedLinkId]);

  const chartData: ChartPoint[] = useMemo(() => {
    if (selectedLinkId === 'all') {
      return links.map(item => ({ name: item.short_id, clicks: item.clicks }));
    }
    return links
      .filter(item => item.short_id === selectedLinkId)
      .map(item => ({ name: item.short_id, clicks: item.clicks }));
  }, [links, selectedLinkId]);

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm font-medium">Loading analytics data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-sm mt-1 opacity-60">Overview of your short link statistics</p>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="link-select" className="text-sm font-medium opacity-70">
            Filter Scope:
          </label>
          <select
            id="link-select"
            value={selectedLinkId}
            onChange={(e) => setSelectedLinkId(e.target.value)}
            className="px-3 py-1.5 rounded-md border shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent text-inherit cursor-pointer"
          >
            <option value="all" className="bg-slate-950 text-white">
              Combined (All Links)
            </option>
            {links.map(link => (
              <option 
                key={link.id} 
                value={link.short_id} 
                className="bg-slate-950 text-white"
              >
                {link.short_id} ({link.long_url.substring(0, 22)}...)
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="rounded-lg border p-6 shadow-sm">
          <span className="text-xs uppercase font-semibold tracking-wider opacity-60">
            Total Links Tracked
          </span>
          <h2 className="text-3xl font-bold mt-1 font-mono">{totalLinks}</h2>
        </div>
        <div className="rounded-lg border p-6 shadow-sm">
          <span className="text-xs uppercase font-semibold tracking-wider opacity-60">
            {selectedLinkId === 'all' ? 'Total Combined Clicks' : `Clicks for ${selectedLinkId}`}
          </span>
          <h2 className="text-3xl font-bold mt-1 font-mono">{totalClicks}</h2>
        </div>
      </div>

      {totalClicks === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <p className="text-sm opacity-60">
            No clicks recorded yet for this view configuration.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="rounded-lg border p-4 shadow-sm">
            <h3 className="text-sm font-semibold mb-4 opacity-80">
              {selectedLinkId === 'all' ? 'Clicks Per Link ID' : 'Target Volume Share'}
            </h3>
            <div className="w-full h-56">
              <BarChart data={chartData} />
            </div>
          </div>

          <div className="rounded-lg border p-4 shadow-sm">
            <h3 className="text-sm font-semibold mb-4 opacity-80">
              {selectedLinkId === 'all' ? 'Traffic Pattern Line' : 'Target Baseline Value'}
            </h3>
            <div className="w-full h-56">
              <LineChart data={chartData} />
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default Analytics;