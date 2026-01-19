export const FormKeys = {
    offset: 'offset',
    limit: 'limit',
    userId: 'userId',
    userName: 'userName',
} as const;
export type FormKeys = (typeof FormKeys)[keyof typeof FormKeys];
