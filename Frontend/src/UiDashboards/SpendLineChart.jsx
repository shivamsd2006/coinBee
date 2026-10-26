import {
  ResponsiveContainer, LineChart, Line,
  XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';

const margin = { top: 20, right: 20, left: 10, bottom: 20 };

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

const CustomDot = (props) => {
  const { cx, cy, value } = props;
  if (value === 0) return null;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={4}
      fill="#00D09C"
      stroke="#0A0E17"
      strokeWidth={2}
    />
  );
};

function SpendLineChart({ lineData = [] }) {
  return (
    <ResponsiveContainer width="99%" height="100%">
      <LineChart data={lineData} margin={margin}>
        <defs>
          <linearGradient id="rocketLineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00D09C" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#00D09C" stopOpacity={0.0} />
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
          tickFormatter={(v) => `₹${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
          axisLine={false}
          tickLine={false}
          width={50}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(0, 208, 156, 0.25)', strokeWidth: 1.5 }} />
        <Line
          type="monotone"
          dataKey="uv"
          stroke="#00D09C"
          strokeWidth={3}
          dot={<CustomDot />}
          activeDot={{ r: 6, fill: '#00D09C', stroke: '#FFFFFF', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SpendLineChart;
