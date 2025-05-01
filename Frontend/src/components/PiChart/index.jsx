import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import "./piChart.css"
import { useEffect, useRef, useState } from 'react';

const PiChart = () => {
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
    const key = "value"
    const title="Members by Age Group"
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const dataWithPercentages = data.map(item => ({
        ...item,
        percent: ((item.value / total) * 100).toFixed(1), // Stored as string (e.g. "25.0")
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
                    <ResponsiveContainer width="100%">
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
                                <Cell key={{index}} fill={COLORS[index % COLORS.length]} />
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
