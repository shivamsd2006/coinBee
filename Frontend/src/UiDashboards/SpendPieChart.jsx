import { useState } from 'react';
import {
  ResponsiveContainer, PieChart, Pie,
  Cell, Tooltip, Legend
} from 'recharts';

// Rocket Money vibrant fintech palette
const SLICE_COLORS = [
  '#00D09C', // Rocket signature emerald
  '#06B6D4', // Cyan
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#F59E0B', // Amber
  '#10B981', // Mint
  '#6366F1', // Indigo
  '#F43F5E', // Rose
  '#14B8A6', // Teal
  '#EAB308', // Gold
  '#A855F7', // Violet
];

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const entry = payload[0];
    return (
      <div className="bg-[#151C2C] border border-white/10 rounded-xl px-4 py-2.5 shadow-2xl backdrop-blur-md">
        <p className="text-xs font-semibold mb-0.5" style={{ color: entry.payload.fill }}>
          {entry.name}
        </p>
        <p className="text-base font-bold text-white">
          ₹{entry.value.toLocaleString('en-IN')}
        </p>
        {entry.payload.percent !== undefined && (
          <p className="text-xs text-slate-400 mt-0.5">
            {(entry.payload.percent * 100).toFixed(1)}% of total
          </p>
        )}
      </div>
    );
  }
  return null;
}

const CustomLegend = ({ payload }) => {
  if (!payload?.length) return null;
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-3 max-h-16 overflow-y-auto px-2">
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-1.5 bg-white/5 border border-white/5 px-2.5 py-1 rounded-full">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: entry.color }}
          />
          <span className="text-slate-300 text-xs font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

function SpendPieChart({ pieData = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);

  if (pieData.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-500 text-sm gap-2">
        <span className="text-2xl">🍰</span>
        <span>No spending breakdown for this period</span>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="99%" height="100%">
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="42%"
          innerRadius="52%"
          outerRadius="72%"
          dataKey="value"
          paddingAngle={3}
          onMouseEnter={(_, index) => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          {pieData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={SLICE_COLORS[index % SLICE_COLORS.length]}
              opacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
              stroke={activeIndex === index ? '#FFFFFF' : 'rgba(0,0,0,0.3)'}
              strokeWidth={activeIndex === index ? 2 : 1}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} verticalAlign="bottom" />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default SpendPieChart;
