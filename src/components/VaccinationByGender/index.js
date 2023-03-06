import './index.css'
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const vaccinationByGender = props => {
  const {data} = props
  console.log(data, 'data')

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          cx="50%"
          cy="40%"
          data={data}
          startAngle={0}
          endAngle={180}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="Male" fill="#fecba6" />
          <Cell name="Female" fill="#b3d23f" />
          <Cell name="Others" fill="#a44c9e" />
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

export default vaccinationByGender
