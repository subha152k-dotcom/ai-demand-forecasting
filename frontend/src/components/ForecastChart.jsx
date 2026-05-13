import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function ForecastChart({ data }) {

  return (

    <div className="card">

      <h2 className="text-2xl font-bold mb-5">
        Forecast Analytics
      </h2>

      <div className="w-full h-[350px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <defs>

  <linearGradient
    id="forecastColor"
    x1="0"
    y1="0"
    x2="1"
    y2="1"
  >

    <stop
      offset="0%"
      stopColor="#ec4899"
    />

    <stop
      offset="100%"
      stopColor="#7c3aed"
    />

  </linearGradient>

</defs>

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip
  contentStyle={{
    background:
      "linear-gradient(135deg,#ec4899,#7c3aed)",
    border: "none",
    borderRadius: "16px",
    color: "white",
  }}
  labelStyle={{
    color: "white",
    fontWeight: "bold",
  }}
  itemStyle={{
    color: "white",
  }}
  cursor={{
    fill: "rgba(124,58,237,0.12)",
  }}
/>

            <Bar
              dataKey="sales"
              fill="url(#forecastColor)"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default ForecastChart;