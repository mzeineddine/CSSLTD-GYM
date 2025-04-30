import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Line, LineChart, Legend } from 'recharts';
import "./graph.css"
const Graph = () => {
    const data = [
        {"month": "Jan", "left":4000, "new": 2400},
        {"month": "Feb", "left":3000, "new": 1398},
        {"month": "Mar", "left":2000, "new": 9800},
        {"month": "Apr", "left":2780, "new": 3908},
        {"month": "May", "left":1890, "new": 4800},
        {"month": "Jun", "left":2390, "new": 3800},
        {"month": "Jul", "left":3490, "new": 4300}
    ]
    const title="Members"
    const legend1="new members"
    const legend2="leaving members"
    const color1="green"
    const color2="red"
    const style1 = {color: color1}
    const style2 = {color: color2}
    const keyX = "month"
    const key1 = "new"
    const key2 = "left"
    return (
        <div className='graph'>
            <div className='graph-info'>
                <p>{title}</p>
                <div className='graph-legend'>
                    <p><span className='legend1-color' style={style1}>●</span>{legend1}</p>
                    <p><span className='legend2-color' style={style2}>●</span>{legend2}</p>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data} margin={{ top: 2, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid  vertical={false}/>
                    <XAxis dataKey={keyX} />
                    <YAxis />
                    <Tooltip cursor={false}/>
                    {/* <Legend verticalAlign="top" align="center" /> */}
                    <Line type="natural" dataKey={key1} stroke={color1}  strokeWidth={3} dot={false} legendType="circle"/>
                    <Line type="natural" dataKey={key2} stroke={color2} strokeWidth={3} dot={false} legendType="circle"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Graph;