import { Injectable } from '@angular/core';
import { ApiResponse, App, User, VersionInfo } from '../models/api.models';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = '/api';

    private async fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        });

        debugger;
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const result: ApiResponse<T> = await response.json();

        return result as T;
        
        // if (!result.success) {
        //     throw new Error(result.error || 'Unknown API error');
        // }

        // return result.data as T;
    }

    // Version endpoints
    async getVersion(): Promise<VersionInfo> {
        return this.fetchApi<VersionInfo>('/version');
    }

    // Auth endpoints
    async login(credentials: { username: string; password: string }): Promise<void> {
        await this.fetchApi<void>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    }

    // Apps endpoints
    async getApps(): Promise<App[]> {
        return this.fetchApi<App[]>('/apps');
    }

    async createApp(app: Partial<App>): Promise<App> {
        return this.fetchApi<App>('/apps', {
            method: 'POST',
            body: JSON.stringify(app)
        });
    }

    async updateApp(id: string, app: Partial<App>): Promise<App> {
        return this.fetchApi<App>(`/apps/${id}`, {
            method: 'PUT',
            body: JSON.stringify(app)
        });
    }

    async deleteApp(id: string): Promise<void> {
        await this.fetchApi<void>(`/apps/${id}`, {
            method: 'DELETE'
        });
    }

    // Users endpoints
    async getUsers(): Promise<User[]> {
        return this.fetchApi<User[]>('/users');
    }

    async getUser(id: string): Promise<User> {
        return this.fetchApi<User>(`/users/${id}`);
    }

    async updateUser(id: string, user: Partial<User>): Promise<User> {
        return this.fetchApi<User>(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(user)
        });
    }
}
