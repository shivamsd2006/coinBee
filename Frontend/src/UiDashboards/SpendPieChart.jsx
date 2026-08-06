import { useState } from 'react';
import {
  ResponsiveContainer, PieChart, Pie,
  Cell, Tooltip, Legend
} from 'recharts';

// Gold-to-green color palette for slices
// Each category gets one of these colors in order
const SLICE_COLORS = [
  '#D4A843',  // gold — primary
  '#4ade80',  // green
  '#EDD07A',  // light gold
  '#86efac',  // light green
  '#B08520',  // dark gold
  '#22c55e',  // deeper green
  '#F7E8B5',  // pale gold
  '#16a34a',  // forest green
  '#7A5C0F',  // brown gold
  '#bbf7d0',  // mint
  '#E2BB57',  // warm gold
  '#4ade80',  // repeat
];

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const entry = payload[0];
    return (
      <div style={{
        background:   '#1a1a18',
        border:       '1px solid rgba(212,168,67,0.3)',
        borderRadius: '8px',
        padding:      '10px 14px',
      }}>
        <p style={{ color: entry.payload.fill, margin: 0, fontWeight: 700 }}>
          {entry.name}
        </p>
        <p style={{ color: '#e8e3d8', margin: 0 }}>
          ₹{entry.value.toLocaleString('en-IN')}
        </p>
        <p style={{ color: '#888580', margin: 0, fontSize: 12 }}>
          {(entry.payload.percent * 100).toFixed(1)}% of total
        </p>
      </div>
    );
  }
  return null;
}

// Custom legend — renders color dot + category name + amount
const CustomLegend = ({ payload }) => {
  if (!payload?.length) return null;
  return (
    <div style={{
      display:       'flex',
      flexWrap:      'wrap',
      gap:           '8px 16px',
      justifyContent: 'center',
      marginTop:     '8px',
    }}>
      {payload.map((entry, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width:        8,
            height:       8,
            borderRadius: '50%',
            background:   entry.color,
          }} />
          <span style={{ color: '#888580', fontSize: 11 }}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

// pieData: [{ name: 'Groceries', value: 4200 }, { name: 'Travel', value: 1800 }]
// name → slice label, value → slice size
function SpendPieChart({ pieData = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);

  // if no data, show empty state
  if (pieData.length === 0) {
    return (
      <div style={{
        height:         '100%',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        color:          '#6b6860',
        fontSize:       14,
      }}>
        No spending data for this period
      </div>
    );
  }

  return (
    <ResponsiveContainer width="99%" height="100%">
      <PieChart>
        <defs>
          {/* glow filter for active slice */}
          <filter id="pieGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <Pie
          data={pieData}
          cx="50%"
          cy="45%"
          innerRadius="50%"
          outerRadius="70%"
          dataKey="value"
          paddingAngle={3}
          onMouseEnter={(_, index) => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          {pieData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={SLICE_COLORS[index % SLICE_COLORS.length]}
              opacity={activeIndex === null || activeIndex === index ? 1 : 0.45}
              stroke={activeIndex === index
                ? 'rgba(74,222,128,0.5)'
                : 'rgba(0,0,0,0.2)'}
              strokeWidth={activeIndex === index ? 2 : 0.5}
            />
          ))}
        </Pie>

        <Tooltip content={<CustomTooltip />} />
        <Legend
          content={<CustomLegend />}
          verticalAlign="bottom"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default SpendPieChart;w