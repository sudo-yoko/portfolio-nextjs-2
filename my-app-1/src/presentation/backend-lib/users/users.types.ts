export type UsersRequest = {
    keyword: string;
    offset: string;
    limit: string;
};

export type User = {
    userId: string;
    userName: string;
};

export type Users = {
    total: number;
    users: User[];
};
