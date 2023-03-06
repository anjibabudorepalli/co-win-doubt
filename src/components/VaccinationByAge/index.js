import './index.css'
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const VaccinationByAge = props => {
  const {data} = props
  console.log(data, '222222')

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          cx="50%"
          cy="40%"
          data={data}
          startAngle={0}
          endAngle={360}
          innerRadius="0%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell fill="#fecba6" />
          <Cell fill="#b3d23f" />
          <Cell fill="#a44c9e" />
        </Pie>
        <Legend
          iconType="half"
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default VaccinationByAge
