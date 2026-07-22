import {
  ResponsiveContainer, LineChart, Line,
  XAxis, YAxis, Tooltip, CartesianGrid, Dot
} from 'recharts';

const margin = { top: 20, right: 30, left: 50, bottom: 20 };

function CustomTooltip({ payload, label, active }) {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background:   '#1a1a18',
        border:       '1px solid rgba(212,168,67,0.3)',
        borderRadius: '8px',
        padding:      '10px 14px',
      }}>
        <p style={{ color: '#D4A843', margin: 0, fontWeight: 700 }}>{label}</p>
        <p style={{ color: '#e8e3d8', margin: 0 }}>
          ₹{payload[0].value.toLocaleString('en-IN')}
        </p>
      </div>
    );
  }
  return null;
}

// Custom dot — gold filled circle, green glow ring for active dot
const CustomDot = (props) => {
  const { cx, cy, value } = props;
  if (value === 0) return null;  // hide dots on zero values
  return (
    <circle
      cx={cx}
      cy={cy}
      r={5}
      fill="#D4A843"
      stroke="rgba(74,222,128,0.4)"
      strokeWidth={3}
    />
  );
};

// lineData: same shape as bar chart — [{ name: 'Mon', uv: 1500 }, ...]
// name → X-axis label, uv → line height
function SpendLineChart({ lineData = [] }) {
  return (
    <ResponsiveContainer width="99%" height="100%">
      <LineChart data={lineData} margin={margin}>

        <defs>
          {/* gradient under the line — gold fading to green */}
          <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#D4A843" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#4ade80" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(255,255,255,0.05)"
          vertical={false}
        />
        <XAxis
          dataKey="name"
          stroke="#888580"
          tick={{ fill: '#888580', fontSize: 12 }}
          axisLine={{ stroke: 'rgba(212,168,67,0.2)' }}
          tickLine={false}
        />
        <YAxis
          stroke="#888580"
          tick={{ fill: '#888580', fontSize: 11 }}
          tickFormatter={v => `₹${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
          axisLine={false}
          tickLine={false}
          width={55}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(212,168,67,0.2)', strokeWidth: 1 }} />
        <Line
          type="monotone"
          dataKey="uv"
          stroke="#D4A843"
          strokeWidth={2.5}
          dot={<CustomDot />}
          activeDot={{ r: 7, fill: '#D4A843', stroke: 'rgba(74,222,128,0.5)', strokeWidth: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SpendLineChart;