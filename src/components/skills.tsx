"use client"


import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export function Skills({ skills }: Readonly<{ skills: [string, number][] }>) {
    const data = skills.map(([skill, score]) => ({
        name: skill,
        score: score
    }));
    return (
        <ResponsiveContainer width="100%" height="100%" >
            <BarChart data={data} layout="vertical">
                <Legend/>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip/>
                <XAxis type="number" domain={[0, 10]} ticks={[0, 5, 10]}/>
                <YAxis dataKey="name" type="category" fontSize={10}/>
                <Bar dataKey="score" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}