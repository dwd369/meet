import { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Sector,
    Cell,
    ResponsiveContainer,
    Legend
} from "recharts";

const EventGenresChart = ({events}) => {

    // extract events prop
    const [data, setData] = useState([]);
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

    // const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#8884d8"];
    const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
    
    const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;    
        const radius = outerRadius;
        const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
        const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
  
        return percent ? (
            <text
                x={x}
                y={y}
                fill="#8884d8"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central">
                {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
            </text>
        ) : null;
    }
    
    useEffect(() => {
        setData(getData());
    }, [`${events}`])

    const getData = () => {
        const data = genres.map((genre) => {
            const filteredEvents = events.filter((event) => event.summary.includes(genre));
            const count = filteredEvents.length;
            return {
                name: genre,
                value: count
            }
        })
        return data;
    };

    return (
        <ResponsiveContainer width="99%" height={400}>
        <PieChart width={400} height={400}>
            <Pie
                data={data}
                dataKey="value"
                fill="#8884d8"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={130}
            >
                {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
               
            </Pie>

            <Legend />
            
        {/* <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label = {renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
        >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie> */}
          </PieChart>
        </ResponsiveContainer>
    )
}

export default EventGenresChart;