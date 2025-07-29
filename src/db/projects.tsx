export enum ProjectStatus {
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

export type Project = {
    title: string;
    desc: string;
    status: ProjectStatus;
    children?: Project[];  // 子プロジェクトへの参照
}

export const projects: Project[] = [
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

/// プロジェクトの全てを取得する関数
/// この関数は、プロジェクトの階層構造をフラット化して、全てのプロジェクトを1次元配列として返します。
export function getProjectAll(): Project[] {
    const flattened: Project[] = [];
    const flatten = (project: Project) => {
        flattened.push(project);
        if (project.children) {
            project.children.forEach(flatten);
        }
    }
    projects.forEach(flatten);
    return flattened;
}