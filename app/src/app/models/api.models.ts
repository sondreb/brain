export interface VersionInfo {
    version: string;
    environment: string;
    commit: string;
    branch: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    created: Date;
}

export interface App {
    id: string;
    name: string;
    description: string;
    created: Date;
    userId: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}
