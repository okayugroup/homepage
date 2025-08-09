"use client"
import {Bar, Radar} from "react-chartjs-2";
import {
    Chart,
    RadarController,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
} from "chart.js";

// レーダーチャート用の要素をregister！
Chart.register(
    RadarController,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);


export function Skills({ skills }: Readonly<{ skills: [string, number][] }>) {
    const data = {
        labels: skills.map(a => a[0]),
        datasets: [
            {
                data: skills.map(a => a[1]),
                backgroundColor: "rgba(75, 192, 192, 0.2)", // 全ての言語に同じ色を適用
            },
        ],
    };
    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            r: {
                min: 0,
                max: 10,
            }
        },
        responsive: true,
    }
    return <Radar data={data} options={options} height={200} width={200}/>;
}