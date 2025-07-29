enum ProjectStatus {
    NotStarted,   // 未着手
    InProgress,   // 進行中
    InReview,     // レビュー待ち
    Fixing,       // 修正中
    OnHold,       // 保留中
    Blocked,      // ブロック中
    Completed,    // 完了
    Cancelled,    // 中止
    Postponed,    // 延期
    WaitingApproval // 承認待ち
}

type Project = {
    title: string;
    desc: string;
    status: ProjectStatus;
    children?: Project[];  // 子プロジェクトへの参照
}

const projects: Project[] = [
    {
        title: "OGSP",
        desc: "おかゆグループによる災害対策プロジェクト",
        status: ProjectStatus.InProgress,
        children: [
            {
                title: "OGSP Seismometer",
                desc: "おかゆグループ開発の地震計",
                status: ProjectStatus.InProgress
            },
            {
                title: "OGSP Server Node",
                desc: "ネットワークノード",
                status: ProjectStatus.OnHold
            },
            {
                title: "OGSP Network",
                desc: "災害情報共有・データ配信ネットワーク",
                status: ProjectStatus.NotStarted
            },
            {
                title: "OGSP Disaster Prevention",
                desc: "OGSPのPC向けクライアント",
                status: ProjectStatus.Blocked
            },
        ]
    },
];