"use client"
import {Bar} from "react-chartjs-2";
import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    BarController,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    BarController,
    Title,
    Tooltip,
    Legend
);

export function Lang({ languages }: Readonly<{ languages: { [_: string]: number } }>) {
    const data = {
        labels: Object.keys(languages),
        datasets: [
            {
                data: Object.values(languages),
                backgroundColor: Object.keys(languages).map(getColorByLanguage),
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
            x: {
                min: 0,
                max: 10,
                ticks: {
                    stepSize: 0.5, // ← ここ！目盛りを10ごとにする
                }
            }
        },
        indexAxis: "y" as const,
        responsive: true,
    }
    return <Bar data={data} options={options} height={400} width={800}/>;
}

function getColorByLanguage(lang: string): string {
    const colors: { [key: string]: string } = {
        "JavaScript": "#f8e873",
        "TypeScript": "#59ade2",
        "Python": "#3572A5",
        "Java": "#b07219",
        "C++": "#f34b7d",
        "Ruby": "#701516",
        "Go": "#6fd7d9",
        "PHP": "#4F5D95",
        "Rust": "#dea584",
        "Swift": "#ffac45",
        // 他の言語も必要に応じて追加
    };
    return (colors[lang] || "#cccccc")+"a0"; // デフォルトの色
}