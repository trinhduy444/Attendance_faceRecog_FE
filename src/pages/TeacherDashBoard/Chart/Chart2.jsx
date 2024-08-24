import React from 'react';
import { BarChart, PieChart, Pie, Cell, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import HeatMap from 'react-heatmap-grid';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Chart2 = ({ data, type }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            {type === "bar" ? (
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                        dataKey="value"
                        fill={(entry, index) => COLORS[index % COLORS.length]}
                    />
                </BarChart>
            ) : type === "pie" ? (
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            ) : type === "heatmap" ? (
                <HeatMap
                    xLabels={data.xLabels}
                    yLabels={data.yLabels}
                    data={data.heatmapData}
                    squares
                    onClick={(x, y) => alert(`Clicked ${x}, ${y}`)}
                />
            ) : null}
        </ResponsiveContainer>
    );
};

export default Chart2;
