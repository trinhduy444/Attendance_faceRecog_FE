import React from 'react';
import { LineChart, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Bar, ResponsiveContainer } from 'recharts';

const AttendanceChart = ({ data, type }) => {
    return (
        <ResponsiveContainer width="100%" height={250}>
            {type === "line" ? (
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="attended" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            ) : type === "bar" ? (
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="attended" fill="#8884d8" />
                </BarChart>
            ) : null}
        </ResponsiveContainer>
    );
};
export default AttendanceChart;
