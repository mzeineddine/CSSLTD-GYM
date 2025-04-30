import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import "./piChart.css"
const data = [
    { name: '0-12', value: 400 },
    { name: '13-29', value: 300 },
    { name: '30-59', value: 200 },
    { name: '+60', value: 100 },
];

const COLORS = ['red', 'yellow', 'green', 'blue'];

const styles = COLORS.map((color) => ({
    color: color,
}));
// const percentages = []
const key = "value"
const title="Members by Age Group"
const PiChart = () => (
    <div className='piChart'>
        <div className='graph-info'>
            <p>{title}</p>
        </div>
        <div className='piChard-and-legend'>
            <ResponsiveContainer width="50%">
                <PieChart>
                    <Pie
                        data={data}
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={3}
                        dataKey={key}
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                    {data.map((_, index) => (
                        <Cell key={{index}} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className='graph-legend'>
                    {
                        data.map((data, index) => {
                            return <p key={index}><span className='legend-color' style={styles[index]}>●</span>{data.name} </p>
                        })
                    }
            </div>
        </div>
    </div>
);

export default PiChart;
