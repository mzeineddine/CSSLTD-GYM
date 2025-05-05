import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import "./piChart.css"
import { useEffect, useRef, useState } from 'react';

const PiChart = (props) => {
    const data = props.data
    const colors = props.colors
    const styles = colors.map((color) => ({
        color: color,
    }));
    const key = props.chart_key
    const title=props.title
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const dataWithPercentages = data.map(item => ({
        ...item,
        percent: ((item.value / total) * 100).toFixed(1),
    }));
    
    const [size, setSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef(null);
    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                setSize({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                });
            }
        };
        updateSize();
        window.addEventListener('resize', updateSize);
    }, []);
    return(
        <div className='piChart'>
            <div className='graph-info'>
                <p>{title}</p>
            </div>
            <div className='piChart-and-legend'>
                <div className='piChart-graph'  ref={containerRef}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                innerRadius={size.width * 0.2}  // 20% of container width
                                outerRadius={size.width * 0.3}
                                paddingAngle={3}
                                dataKey={key}
                                // label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                            >
                            {data.map((_, index) => (
                                <Cell key={{index}} fill={colors[index % colors.length]} />
                            ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className='graph-legend-values'>
                        <div className="graph-legend">
                            {
                                data.map((data, index) => {
                                    return <p key={index}><span className='legend-color' style={styles[index]}>●</span>{data.name} </p>
                                })
                            }
                        </div>
                        <div className="graph-legend">
                            {
                                data.map((data, index) => {
                                return <p key={index}>{dataWithPercentages[index].percent}%</p>
                                })
                            }
                        </div>
                        
                </div>
            </div>
        </div>
    );
}
    
export default PiChart;
