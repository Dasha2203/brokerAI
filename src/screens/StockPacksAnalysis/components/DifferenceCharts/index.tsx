import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { Props } from './types';

const COLORS = ['#6418C3', '#5ECFFF', '#E328AF', '#FFAB2D', '#FF4A55'];

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) / 2; // Радиус для размещения текста в центре сектора
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180)); // Координата X
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180)); // Координата Y

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      alignmentBaseline="middle"
      fontSize={14}
    >
      {`${(percent * 100).toFixed(0)}%`} {/* Отображение процента */}
    </text>
  );
};

const DifferenceCharts = ({ data }: Props) => {
  return (
    <div style={{ width: '100%', height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={100} height={100}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            dataKey="currentPrice"
            nameKey="key"
            innerRadius={60}
            outerRadius={120}
            fill="#8884d8"
            label={renderCustomLabel}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            height={36}
            payload={data.map((entry, index) => ({
              value: `${entry.key}: ${entry.currentPrice}`,
              type: 'circle',
              color: COLORS[index % COLORS.length],
            }))}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DifferenceCharts;
