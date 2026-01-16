export type Item = {
    id: string;
    method: string;
    path: string;
    description: string;
    params?: {
        path?: string;
        query?: string;
    };
};
