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

export function toString(status: ProjectStatus): string {
    switch (status) {
        case ProjectStatus.NotStarted: return "未着手";
        case ProjectStatus.InProgress: return "進行中";
        case ProjectStatus.InReview: return "レビュー待ち";
        case ProjectStatus.Fixing: return "修正中";
        case ProjectStatus.OnHold: return "保留中";
        case ProjectStatus.Blocked: return "ブロック中";
        case ProjectStatus.Completed: return "完了";
        case ProjectStatus.Cancelled: return "中止";
        case ProjectStatus.Postponed: return "延期";
        case ProjectStatus.WaitingApproval: return "承認待ち";
    }
}

export function toColor(status: ProjectStatus): string {
    switch (status) {
        case ProjectStatus.NotStarted: return "text-gray-500";
        case ProjectStatus.InProgress: return "text-blue-500";
        case ProjectStatus.InReview: return "text-yellow-500";
        case ProjectStatus.Fixing: return "text-orange-500";
        case ProjectStatus.OnHold: return "text-purple-500";
        case ProjectStatus.Blocked: return "text-red-500";
        case ProjectStatus.Completed: return "text-green-500";
        case ProjectStatus.Cancelled: return "text-gray-400";
        case ProjectStatus.Postponed: return "text-pink-500";
        case ProjectStatus.WaitingApproval: return "text-teal-500";
    }
}

export type Project = {
    id: string;
    title: string;
    desc: string;
    status: ProjectStatus;
    children?: Project[];  // 子プロジェクトへの参照
}

export const projects: Project[] = [
    {
        id: "com.okayugroup.ogsp",
        title: "OGSP",
        desc: "おかゆグループによる災害対策プロジェクト",
        status: ProjectStatus.InProgress,
        children: [
            {
                id: "com.okayugroup.ogsp.sensors.seismometer",
                title: "OGSP Seismometer",
                desc: "おかゆグループ開発の地震計",
                status: ProjectStatus.InProgress
            },
            {
                id: "com.okayugroup.ogsp.server",
                title: "OGSP Server Node",
                desc: "ネットワークノード",
                status: ProjectStatus.OnHold
            },
            {
                id: "com.okayugroup.ogsp.network",
                title: "OGSP Network",
                desc: "災害情報共有・データ配信ネットワーク",
                status: ProjectStatus.NotStarted
            },
            {
                id: "com.okayugroup.ogsp.client.pc",
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

export function getProjects() { return projects; }