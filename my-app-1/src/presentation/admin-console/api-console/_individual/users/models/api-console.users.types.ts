export const FormKeys = {
    offset: 'offset',
    limit: 'limit',
    userId: 'userId',
    userName: 'userName',
} as const;
export type FormKeys = (typeof FormKeys)[keyof typeof FormKeys];    // NOTE: オブジェクトの値を型として抽出

export type UsersParam = {
    offset: string;
    limit: string;
    userId: string;
    userName: string;
};