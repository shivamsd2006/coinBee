import {
  ResponsiveContainer, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';

const margin = { top: 20, right: 30, left: 40, bottom: 20 };

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
        <p style={{ color: '#e8e3d8', margin: 0 }}>₹{payload[0].value}</p>
      </div>
    );
  }
  return null;
}

// expenseDataDb: [{ name: 'Mon', uv: 1500 }, { name: 'Tue', uv: 800 }, ...]
// name → X-axis label (day name / week number / month name)
// uv   → bar height (total expense for that period)
function SpendBarChart({ expenseDataDb }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={expenseDataDb} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey="name"
          stroke="#888580"
          tick={{ fill: '#888580', fontSize: 12 }}
        />
        <YAxis
          stroke="#888580"
          tick={{ fill: '#888580', fontSize: 12 }}
          tickFormatter={value => `₹${value}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="uv" fill="#D4A843" barSize={40} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SpendBarChart;