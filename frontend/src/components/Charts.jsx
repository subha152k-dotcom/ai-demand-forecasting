import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Charts({ data }) {

  return (

    <div className="w-full">

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-gray-800">

          Monthly Sales Analytics

        </h2>

        <p className="text-gray-500 text-sm mt-2">

          Sales performance overview

        </p>

      </div>

      <div className="w-full h-[350px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
            />

            <XAxis
              dataKey="month"
              tick={{
                fontSize: 12,
              }}
            />

            <YAxis
              tick={{
                fontSize: 12,
              }}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#6366f1"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default Charts;