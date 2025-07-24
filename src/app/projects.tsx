const projects = [
    { title: "OGSP", desc: "おかゆグループによる災害対策プロジェクト", status: 1 },
    { title: "OGSP Seismometer", desc: "おかゆグループ開発の地震計", status: 1 },
    { title: "OGSP Server Node", desc: "ネットワークノード", status: 1 },
    { title: "OGSP Network", desc: "災害情報共有・データ配信ネットワーク", status: 1 },
    { title: "OGSP Disaster Prevention", desc: "OGSPのPC向けクライアント", status: 1 },
];

const statuses = [
    <span key="0" className="text-yellow-500 dark:text-yellow-200">予定</span>,
    <span key="1" className="text-green-500 dark:text-green-200">進行中</span>,
    <span key="2" className="text-blue-500 dark:text-blue-200">完了</span>,
    <span key="3" className="text-red-500 dark:text-red-200">中止</span>,
]

export function getProjectsHome() {
    return projects.map((p, i) => (
        <div
            key={i}
            className="min-w-[220px] snap-center bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex-shrink-0"
        >
            <h3 className="font-bold text-lg mb-2">{p.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{p.desc}</p>
            <div className="mt-4">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                ステータス: {statuses[p.status]}
                            </span>
            </div>
        </div>
    ))
}