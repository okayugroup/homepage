"use client"

import {PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip} from "recharts";

export function Lang({ languages }: Readonly<{ languages: { [_: string]: number } }>) {
    return <ResponsiveContainer>
        <RadarChart width={400} height={400} data={
            Object.entries(languages).map(([lang, score]) => ({
                lang: lang,
                score: score
            }))}>
            <PolarGrid />
            <PolarAngleAxis dataKey="lang" fontSize={13} />
            <PolarRadiusAxis domain={[0, 10]} ticks={[0, 5, 10]} />
            <Tooltip />
            <Radar name="Language" dataKey="score" stroke="#8884d8" fill="#f8e863" fillOpacity={0.6} />
        </RadarChart>
    </ResponsiveContainer>
}
