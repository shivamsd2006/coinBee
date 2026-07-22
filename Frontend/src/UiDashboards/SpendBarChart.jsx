import {
  ResponsiveContainer, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid, Cell
} from 'recharts';

const margin = { top: 20, right: 30, left: 50, bottom: 20 };

// Custom bar shape — renders minimum height + gradient
const CustomBar = (props) => {
  const { x, y, width, height, value } = props;

  // minimum visual height of 4px so zero/tiny bars still show
  const MIN_HEIGHT = 4;
  const displayHeight = Math.max(height, value > 0 ? MIN_HEIGHT : 0);
  const adjustedY = y + height - displayHeight;

  return (
    <g>
      {/* green glow base — always rendered when value > 0 */}
      {value > 0 && (
        <rect
          x={x}
          y={adjustedY}
          width={width}
          height={displayHeight}
          fill="url(#goldGradient)"
          rx={4}
          ry={4}
        />
      )}
      {/* zero value — show a subtle green indicator line */}
      {value === 0 && (
        <rect
          x={x}
          y={adjustedY + displayHeight - 2}
          width={width}
          height={2}
          fill="rgba(74, 222, 128, 0.3)"
          rx={1}
        />
      )}
    </g>
  );
};

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
        <p style={{ color: '#e8e3d8', margin: 0 }}>₹{payload[0].value.toLocaleString('en-IN')}</p>
      </div>
    );
  }
  return null;
}

function SpendBarChart({ stateData }) {
  return (
    <ResponsiveContainer width="99%" height="100%">
      <BarChart data={stateData} margin={margin}>

        {/* SVG gradient definition — gold to green tint at base */}
        <defs>
          <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#D4A843" stopOpacity={1} />
            <stop offset="100%" stopColor="#4ade80" stopOpacity={0.4} />
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
          tickFormatter={value => `₹${value >= 1000 ? `${(value/1000).toFixed(0)}k` : value}`}
          axisLine={false}
          tickLine={false}
          width={55}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(212,168,67,0.05)' }} />
        <Bar
          dataKey="uv"
          shape={<CustomBar />}
          barSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SpendBarChart;