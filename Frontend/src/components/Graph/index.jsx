import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Line, LineChart, Legend } from 'recharts';
import "./graph.css"
const Graph = (props) => {
    const data = props.data; 
    const title=props.title
    const key_x = props.key_x
    const lines_data=props.lines_data
    return (
        <div className='graph'>
            <div className='graph-info'>
                <p>{title}</p>
                <div className='graph-legend'>                
                    {/* <p><span className='legend1-color' style={style1}>●</span>{legend1}</p>
                    <p><span className='legend2-color' style={style2}>●</span>{legend2}</p> */}
                    {
                        lines_data.map((value,index) => {
                            return(
                                <p key={index}><span style={{color:value.color}}>●</span>{value.legend}</p>
                            )
                        })
                    }
                </div>
            </div>
            <ResponsiveContainer width="100%" height="80%">
                <LineChart data={data} margin={{ top: 2,right:10,bottom: 10 }}>
                    <CartesianGrid  vertical={false}/>
                    <XAxis dataKey={key_x} />
                    <YAxis />
                    <Tooltip cursor={false}/>
                    {/* <Legend verticalAlign="top" align="center" /> */}
                    {/* <Line type="natural" dataKey={key1} stroke={color1}  strokeWidth={3} dot={false} legendType="circle"/>
                    <Line type="natural" dataKey={key2} stroke={color2} strokeWidth={3} dot={false} legendType="circle"/> */}
                    {
                        lines_data.map((value) => {
                            return(
                                <Line type="natural" dataKey={value.key} stroke={value.color}  strokeWidth={3} dot={false} legendType="circle"/>
                            )
                        })
                    }
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Graph;