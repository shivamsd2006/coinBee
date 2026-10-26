import {
  ResponsiveContainer, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid, Cell
} from 'recharts';

const margin = { top: 20, right: 20, left: 10, bottom: 20 };

// Custom bar shape — renders minimum height + gradient
const CustomBar = (props) => {
  const { x, y, width, height, value } = props;
  const MIN_HEIGHT = 4;
  const displayHeight = Math.max(height, value > 0 ? MIN_HEIGHT : 0);
  const adjustedY = y + height - displayHeight;

  return (
    <g>
      {value > 0 && (
        <rect
          x={x}
          y={adjustedY}
          width={width}
          height={displayHeight}
          fill="url(#rocketEmeraldGradient)"
          rx={6}
          ry={6}
        />
      )}
      {value === 0 && (
        <rect
          x={x}
          y={adjustedY + displayHeight - 2}
          width={width}
          height={2}
          fill="rgba(255, 255, 255, 0.08)"
          rx={1}
        />
      )}
    </g>
  );
};

function CustomTooltip({ payload, label, active }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#151C2C] border border-white/10 rounded-xl px-4 py-2.5 shadow-2xl backdrop-blur-md">
        <p className="text-xs font-semibold text-slate-400 mb-0.5">{label}</p>
        <p className="text-base font-bold text-[#00D09C]">
          ₹{payload[0].value.toLocaleString('en-IN')}
        </p>
      </div>
    );
  }
  return null;
}

function SpendBarChart({ stateData }) {
  return (
    <ResponsiveContainer width="99%" height="100%">
      <BarChart data={stateData} margin={margin}>
        <defs>
          <linearGradient id="rocketEmeraldGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00D09C" stopOpacity={1} />
            <stop offset="100%" stopColor="#059669" stopOpacity={0.4} />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(255, 255, 255, 0.05)"
          vertical={false}
        />
        <XAxis
          dataKey="name"
          stroke="#64748B"
          tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 500 }}
          axisLine={{ stroke: 'rgba(255, 255, 255, 0.08)' }}
          tickLine={false}
        />
        <YAxis
          stroke="#64748B"
          tick={{ fill: '#64748B', fontSize: 11 }}
          tickFormatter={(value) => `₹${value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}`}
          axisLine={false}
          tickLine={false}
          width={50}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 208, 156, 0.05)' }} />
        <Bar
          dataKey="uv"
          shape={<CustomBar />}
          barSize={36}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SpendBarChart;
